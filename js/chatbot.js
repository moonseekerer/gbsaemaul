/* ==========================================================================
   AI Saemaul ODA Consultant Interactive Chatbot Simulator (Groq Proxy Integrated)
   ========================================================================== */

class SaemaulChatbot {
  constructor(messagesContainerId, inputId, sendBtnId) {
    this.container = document.getElementById(messagesContainerId);
    this.input = document.getElementById(inputId);
    this.sendBtn = document.getElementById(sendBtnId);

    this.init();
  }

  init() {
    if (!this.sendBtn || !this.input) return;

    this.sendBtn.addEventListener('click', () => this.handleUserSend());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserSend();
    });

    // Delegate quick prompt button clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-btn')) {
        const promptText = e.target.innerText;
        this.input.value = promptText;
        this.handleUserSend();
      }
    });
  }

  async handleUserSend() {
    const text = this.input.value.trim();
    if (!text) return;

    // Append User Message
    this.appendMessage(text, 'user');
    this.input.value = '';

    // Show Typing Indicator
    this.showTypingIndicator();

    try {
      const systemPrompt = `당신은 경상북도 디지털 새마을 ODA 컨설턴트입니다. 
근면·자조·협동의 새마을 정신에 AI, IoT, 친환경 에너지 등 3세대 디지털 적정기술을 융합하여 개도국 농촌의 자립과 주민 소득 증대를 돕는 혁신적인 컨설팅을 제안해야 합니다.
사용자의 질문에 대해 경상북도 22개 시·군의 고유한 산업적 강점(예: 포항의 해양, 구미의 IT, 경주의 역사보존, 의성의 유기농, 칠곡의 평화 ODA 등)과 글로벌 ODA 프로젝트를 매핑하여 명쾌하고 전문적이며 실현 가능한 솔루션을 제공하세요.
대화 창 크기가 한정되어 있으므로 답변은 3~4문장 내외로 간결하고 핵심만 담아 정중한 한국어로 답변해 주세요.`;

      // Call the local python proxy server /api/chat instead of Groq directly to avoid CORS blocks
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: text }
          ],
          temperature: 0.7,
          max_tokens: 400
        })
      });

      this.removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content.trim();
      this.appendMessage(botResponse, 'bot');

    } catch (error) {
      console.error('Chatbot API Error:', error);
      this.removeTypingIndicator();
      
      // Show fallback message
      this.appendMessage(`[AI 컨설턴트 (로컬 예비시나리오 가동)]:`, 'bot');
      const fallbackRes = this.generateResponse(text);
      this.appendMessage(fallbackRes, 'bot');
    }
  }

  generateResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('영양') || q.includes('고추')) {
      return `🌶️ **[영양 고추 3축 매칭 모델]**\n영양군의 50년 고추 유기농 생육 장인(시니어)의 영농 노하우를 기반으로, 캡사이신 바이오 가공식품 및 청년 푸드테크 창업(청년 유입)을 육성하고, 이를 아시아 고산지대 ODA 농가 연수생(글로벌)과 매칭하여 현지 영농 수익을 증대시키는 글로벌 자립형 소득 모델입니다.`;
    } else if (q.includes('상주') || q.includes('스마트팜')) {
      return `🌾 **[상주 스마트팜 3축 매칭 모델]**\n상주시의 고품질 오이·참외 스마트팜 재배 장인(시니어)의 온실 관리 기술을 모바일 원격 제어 앱 및 청년 ICT 벤처(청년 유입)와 결합하고, 이를 중앙아시아 및 몽골의 해외 농업 ODA 초청 연수생(글로벌)에게 교육하여 기후변화 적응형 스마트 영농 자립화를 추진하는 모델입니다.`;
    } else if (q.includes('칠곡') || q.includes('에티오피아') || q.includes('평화')) {
      return `🕊️ **[칠곡 에티오피아 평화 새마을 모델]**\n칠곡군의 6.25 참전국 보은 정신을 바탕으로 참전 유족 은퇴 어르신 멘토단(시니어)과 아프리카 공정무역 커피/농산물 브랜딩 청년 창업가(청년 유입)를 연계하고, 에티오피아 디키체 마을(글로벌)에 자립형 에코 마을기업 펀딩 및 식수관 인프라를 구축하는 평화 공헌 ODA 모델입니다.`;
    } else if (q.includes('경산') || q.includes('글로벌') || q.includes('대학원')) {
      return `🎓 **[경산 글로벌 새마을 ODA 교육 모델]**\n경산시 영남대 박정희새마을대학원(PSPS) 등 전 세계 70개국 글로벌 유학생 네트워크(글로벌)와 은퇴 행정 전문가 멘토단(시니어), 그리고 디지털 플랫폼 개발 청년 인재(청년 유입)를 결합하여 개발도상국 고위 공무원 및 현지 디지털 새마을 리더를 양성하는 선진 교육 파이프라인 사업입니다.`;
    } else {
      return `[AI 새마을 컨설턴트]: "${query}"에 관한 문의를 수신했습니다. 경상북도 22개 시·군의 고유 자원(예: 칠곡의 에티오피아 참전보은, 영양의 고추 유기농법 등)을 기반으로, 3세대 디지털 새마을 정신을 접목한 최적의 글로벌 ODA 연계 컨설팅을 제공합니다.`;
    }
  }

  appendMessage(text, sender) {
    if (!this.container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');

    this.container.appendChild(msgDiv);
    this.container.scrollTop = this.container.scrollHeight;
  }

  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `<span>AI 컨설턴트 분석 중...</span>`;
    this.container.appendChild(typingDiv);
    this.container.scrollTop = this.container.scrollHeight;
  }

  removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
}
