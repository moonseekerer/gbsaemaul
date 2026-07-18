/* ==========================================================================
   AI Saemaul ODA Advisor (Groq Proxy Integrated)
   ========================================================================== */

class SaemaulChatbot {
  constructor(messagesContainerId, inputId, sendBtnId) {
    this.container = document.getElementById(messagesContainerId);
    this.input = document.getElementById(inputId);
    this.sendBtn = document.getElementById(sendBtnId);
    this.isTyping = false;

    this.init();
  }

  init() {
    if (!this.sendBtn || !this.input) return;

    this.sendBtn.addEventListener('click', () => this.handleUserSend());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserSend();
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-btn')) {
        this.input.value = e.target.innerText;
        this.handleUserSend();
      }
    });
  }

  getTimeString() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  async handleUserSend() {
    if (this.isTyping) return;
    const text = this.input.value.trim();
    if (!text) return;

    this.appendMessage(text, 'user');
    this.input.value = '';
    this.showTypingIndicator();

    try {
      let gaokContext = '';
      let newsContext = '';

      try {
        if (typeof SAEMAUL_DATA !== 'undefined' && SAEMAUL_DATA.gaokFullData) {
          const lines = Object.entries(SAEMAUL_DATA.gaokFullData)
            .map(([muni, list]) => {
              const items = list.map(e => `${e.country} ${e.city}(${e.type})`).join(' / ');
              return `${muni}: ${items}`;
            });
          gaokContext = '\n\n[경상북도 본청 및 22개 시군 GAOK 공식 해외 교류 전수 데이터]\n' + lines.join('\n');
        }
      } catch(err) {}

      try {
        if (typeof SAEMAUL_NEWS !== 'undefined') {
          const munis = Object.keys(SAEMAUL_NEWS).join(', ');
          newsContext = `\n\n[경상북도 22개 시군 새마을 뉴스 아카이브 보유 지자체]\n${munis}`;
        }
      } catch(err) {}

      const systemPrompt = `[CRITICAL LANGUAGE RULE - MUST FOLLOW ABOVE ALL ELSE]
You MUST write ONLY in Korean (한국어) and standard English alphabet (A-Z, a-z).
STRICTLY FORBIDDEN characters - do NOT use any of these under any circumstances:
- Chinese/CJK characters: 管理 市場 先進 进行 活跃 などの漢字 etc.
- Cyrillic (Russian): а б в г д е any Cyrillic letter
- Japanese kana: あ い う え hiragana/katakana
- Arabic, Thai, or any other non-Latin/non-Korean script
- Transliterated foreign words (e.g. "byk", "aktivno") — use Korean instead

당신은 경상북도 디지털 새마을 AI 어드바이저입니다.
근면·자조·협동의 새마을 정신에 AI, IoT, 친환경 에너지 등 3세대 디지털 적정기술을 융합하여 개도국 농촌의 자립과 주민 소득 증대를 돕는 어드바이징을 제공합니다.

[경상북도 22개 시군 핵심 산업 강점]
포항(해양·철강), 경주(역사문화·유네스코), 구미(IT·전자·새마을재단 본부), 안동(유교·정신문화·경북도청), 영주(산악·유기농), 영천(포도·한의약), 상주(자전거·스마트팜), 문경(석탄·도자기), 경산(대학교육·박정희새마을대학원 PSPS·70개국 유학생 네트워크), 의성(마늘·유기농), 청송(사과·수자원), 영양(고추·유기농), 영덕(대게·해양), 청도(감·와인), 고령(대가야·도예), 성주(참외·스마트팜), 칠곡(에티오피아 한국전쟁 참전보은·평화 ODA), 예천(농업·생태), 봉화(산림·약초), 울진(원자력·해양), 울릉(도서·해양), 군위(화산·관광)${gaokContext}${newsContext}

[답변 규칙]
1. 경산시의 강점은 영남대학교 박정희새마을대학원(PSPS)의 전 세계 70개국 이상 글로벌 유학생 파이프라인입니다.
2. 자매결연·우호교류 도시는 자연스럽게 맞을 때만 언급하고, 억지로 나열하지 마세요.
3. 답변은 4~5문장 이내로 간결하게 작성하세요.`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: text }
          ],
          temperature: 0.6,
          max_tokens: 600
        })
      });

      this.removeTypingIndicator();

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const rawResponse = data.choices[0].message.content.trim();
      const botResponse = this.sanitizeResponse(rawResponse);
      this.appendMessageTyping(botResponse, 'bot');

    } catch (error) {
      console.error('Chatbot API Error:', error);
      this.removeTypingIndicator();
      this.appendMessageTyping('[AI 어드바이저 (오프라인 모드)]\n' + this.generateResponse(text), 'bot');
    }
  }

  generateResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('영양') || q.includes('고추')) {
      return '🌶️ [영양 고추 3축 매칭 모델]\n영양군의 50년 고추 유기농 생육 노하우(시니어)를 캡사이신 바이오 가공식품 및 청년 푸드테크 창업(청년 유입)과 결합하고, 아시아 고산지대 ODA 농가 연수생(글로벌)과 매칭하여 현지 영농 수익을 증대시키는 글로벌 자립형 소득 모델입니다.';
    } else if (q.includes('상주') || q.includes('스마트팜')) {
      return '🌾 [상주 스마트팜 3축 매칭 모델]\n상주시의 오이·참외 스마트팜 재배 기술(시니어)을 모바일 원격 제어 앱 및 청년 ICT 벤처(청년 유입)와 결합하고, 중앙아시아 및 몽골의 해외 농업 ODA 초청 연수생(글로벌)에게 교육하여 기후변화 적응형 스마트 영농 자립화를 추진하는 모델입니다.';
    } else if (q.includes('칠곡') || q.includes('에티오피아') || q.includes('평화')) {
      return '🕊️ [칠곡 에티오피아 평화 새마을 모델]\n칠곡군의 6.25 참전국 보은 정신을 바탕으로 참전 유족 어르신 멘토단(시니어)과 아프리카 공정무역 커피·농산물 브랜딩 청년 창업가(청년 유입)를 연계하고, 에티오피아 농촌 마을(글로벌)에 자립형 에코 마을기업 펀딩 및 식수 인프라를 구축하는 평화 공헌 ODA 모델입니다.';
    } else if (q.includes('경산') || q.includes('글로벌') || q.includes('대학원')) {
      return '🎓 [경산 글로벌 새마을 ODA 교육 모델]\n경산시 영남대 박정희새마을대학원(PSPS)의 전 세계 70개국 글로벌 유학생 네트워크(글로벌)와 은퇴 행정 전문가 멘토단(시니어), 디지털 플랫폼 개발 청년 인재(청년 유입)를 결합하여 개발도상국 고위 공무원 및 현지 디지털 새마을 리더를 양성하는 선진 교육 파이프라인 사업입니다.';
    } else {
      return `[AI 어드바이저]\n경상북도 22개 시·군의 고유 자원(예: 칠곡의 에티오피아 참전보은, 영양의 고추 유기농법 등)을 기반으로, 3세대 디지털 새마을 정신을 접목한 최적의 글로벌 ODA 연계 방안을 안내해 드립니다.`;
    }
  }

  // Strip CJK, Cyrillic, Japanese kana, Arabic, etc. — keep only Hangul + ASCII + emoji
  sanitizeResponse(text) {
    // Remove CJK unified ideographs, Cyrillic, Arabic, Japanese kana, Thai, etc.
    return text
      .replace(/[\u3400-\u9FFF\uF900-\uFAFF]/g, '')  // CJK characters (Chinese/Japanese kanji)
      .replace(/[\u0400-\u04FF]/g, '')                 // Cyrillic (Russian etc.)
      .replace(/[\u3040-\u30FF]/g, '')                 // Japanese hiragana + katakana
      .replace(/[\u0600-\u06FF]/g, '')                 // Arabic
      .replace(/[\u0E00-\u0E7F]/g, '')                 // Thai
      .replace(/\s{2,}/g, ' ')                         // Collapse multiple spaces
      .trim();
  }

  // Append message with timestamp (instant, for user or short bot messages)
  appendMessage(text, sender) {
    if (!this.container) return;
    const timeStr = this.getTimeString();

    const wrapper = document.createElement('div');
    wrapper.className = `msg-wrapper ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = `message ${sender}`;
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    const time = document.createElement('div');
    time.className = 'msg-time';
    time.textContent = timeStr;

    wrapper.appendChild(bubble);
    wrapper.appendChild(time);
    this.container.appendChild(wrapper);
    this.container.scrollTop = this.container.scrollHeight;
  }

  // Append bot message with typewriter effect + timestamp
  appendMessageTyping(text, sender) {
    if (!this.container) return;
    const timeStr = this.getTimeString();
    this.isTyping = true;

    const wrapper = document.createElement('div');
    wrapper.className = `msg-wrapper ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = `message ${sender}`;

    const time = document.createElement('div');
    time.className = 'msg-time';
    time.textContent = timeStr;

    wrapper.appendChild(bubble);
    wrapper.appendChild(time);
    this.container.appendChild(wrapper);

    let i = 0;
    const speed = 20; // ms per character (~50 chars/sec)
    const type = () => {
      if (i < text.length) {
        bubble.innerHTML = text.substring(0, i + 1).replace(/\n/g, '<br>');
        i++;
        this.container.scrollTop = this.container.scrollHeight;
        setTimeout(type, speed);
      } else {
        this.isTyping = false;
      }
    };
    type();
  }

  showTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'msg-wrapper bot';
    wrapper.id = 'typing-indicator-wrapper';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.innerHTML = '<span class="typing-dots"><span>●</span><span>●</span><span>●</span></span>';

    wrapper.appendChild(typingDiv);
    this.container.appendChild(wrapper);
    this.container.scrollTop = this.container.scrollHeight;
  }

  removeTypingIndicator() {
    const el = document.getElementById('typing-indicator-wrapper');
    if (el) el.remove();
  }
}
