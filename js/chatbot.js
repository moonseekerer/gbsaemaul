/* ==========================================================================
   AI Saemaul ODA Advisor (Intelligent Knowledge & Hybrid LLM Engine)
   Project: 글로벌 디지털 새마을 플랫폼 구축
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

    // 1차 필터링: 완전히 무관한 키워드 필터링
    const lowerText = text.toLowerCase();
    const offTopicKeywords = ['레시피', '만드는 법', '만드는법', '파스타', '라면', '피자', '찌개', '볶음밥', '요리법', '맛집', '연예인', '날씨'];
    const hasOffTopic = offTopicKeywords.some(keyword => lowerText.includes(keyword));

    if (hasOffTopic) {
      setTimeout(() => {
        this.removeTypingIndicator();
        this.appendMessageTyping(
          "안녕하세요! 경상북도 디지털새마을 AI 어드바이저입니다.<br><br>저는 경북 22개 시·군의 3세대 새마을 사업, ODA 적정기술 매핑, 해외 자매우호도시 교류(176건) 및 청년 창업 연계에 특화된 정책 안내를 제공하고 있습니다.<br><br>디지털 새마을 ODA 프로젝트나 시·군별 교류 현황에 대해 질문해 주시면 상세히 안내해 드리겠습니다.",
          'bot'
        );
      }, 400);
      return;
    }

    // Try backend LLM if available with short timeout, otherwise use intelligent Knowledge Engine
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'user', content: text }
          ],
          temperature: 0.5,
          max_tokens: 600
        })
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
          const raw = data.choices[0].message.content.trim();
          this.removeTypingIndicator();
          this.appendMessageTyping(this.sanitizeResponse(raw), 'bot');
          return;
        }
      }
      throw new Error('Fallback to local knowledge engine');
    } catch (err) {
      // Local Intelligent Knowledge Engine
      setTimeout(() => {
        this.removeTypingIndicator();
        const smartAnswer = this.generateSmartResponse(text);
        this.appendMessageTyping(smartAnswer, 'bot');
      }, 400);
    }
  }

  // Comprehensive Knowledge Engine covering all 22 cities and core pillars
  generateSmartResponse(query) {
    const q = query.toLowerCase().trim();

    // 1. Check for specific city match across Gyeongbuk's 22 cities
    const cityList = [
      '포항', '경주', '김천', '안동', '구미', '영주', '영천', '상주',
      '문경', '경산', '군위', '의성', '청송', '영양', '영덕', '청도',
      '고령', '성주', '칠곡', '예천', '봉화', '울진', '울릉'
    ];

    let matchedCity = null;
    for (const c of cityList) {
      if (q.includes(c)) {
        matchedCity = c;
        break;
      }
    }

    if (matchedCity) {
      return this.buildCityAdvisory(matchedCity, q);
    }

    // 2. Thematic match: 3축 매칭 / 시니어 / 청년유입 / 글로벌
    if (q.includes('3축') || q.includes('매칭') || q.includes('시니어') || q.includes('유입')) {
      return `<strong>[지방소멸 대응 3축 융합 매칭 모델]</strong><br><br>` +
        `본 플랫폼은 경북 22개 시·군의 고유 자산을 바탕으로 <strong>[시니어 - 청년유입 - 글로벌]</strong> 3축을 1:1:1로 연계합니다.<br><br>` +
        `• <strong>1. 시니어(Senior):</strong> 평생 축적된 농특산물 재배 노하우와 유휴 농지·시설을 청년에게 전수하여 생산 기반을 제공합니다.<br>` +
        `• <strong>2. 청년유입(Youth):</strong> 타지 및 지역 청년 창업가가 AI 센서, 푸드테크, 라이브커머스를 접목해 3세대 자조형 마을기업을 설립합니다.<br>` +
        `• <strong>3. 글로벌(Global):</strong> 관내 외국인 유학생 및 개도국 ODA 초청 연수생을 '글로벌 브릿지 코디네이터'로 매칭해 모국 현지화 판로를 개척합니다.<br><br>` +
        `이를 통해 <strong>자원 전수 → 디지털 창업 → 해외 수출 → 청년 정주</strong>의 지속가능한 선순환 생태계를 구현합니다.`;
    }

    // 3. Thematic match: 3세대 새마을 / 비전 / 역사 / 1세대 / 2세대
    if (q.includes('3세대') || q.includes('비전') || q.includes('세대') || q.includes('이철우') || q.includes('정신')) {
      return `<strong>[제3세대 새마을운동 이니셔티브 비전]</strong><br><br>` +
        `이철우 경북도지사의 선언과 함께 시작된 3세대 새마을운동은 <strong>‘삽과 시멘트’에서 ‘AI와 데이터, 플랫폼’</strong>으로의 대전환을 의미합니다.<br><br>` +
        `• <strong>1세대 새마을 (1970년대):</strong> 절대빈곤 극복을 위한 지붕 개량, 도로 정비 등 생활환경 개선 중심.<br>` +
        `• <strong>2세대 새마을 (2000년대~):</strong> 개발도상국에 한국의 발전 경험을 전파한 새마을세계화(ODA) 나눔 중심.<br>` +
        `• <strong>3세대 디지털 새마을 (현재~2026):</strong> 청년의 창의, AI·데이터 기술, 주민 자조형 비즈니스를 결합하여 <strong>지방소멸과 저출생</strong>을 극복하는 디지털 미래 실천 모델입니다.`;
    }

    // 4. Thematic match: 지도 / 데이터 / 176건 / GAOK
    if (q.includes('지도') || q.includes('176') || q.includes('gaok') || q.includes('데이터') || q.includes('교류')) {
      return `<strong>[기초 지자체 자산 데이터화 & 새마을 지도]</strong><br><br>` +
        `본 플랫폼은 대한민국시도지사협의회(GAOK) 공공데이터와 지자체 보도자료를 연동하여 <strong>경상북도 본청 및 22개 시·군의 176건 해외 교류 전수 현황</strong>을 집대성하였습니다.<br><br>` +
        `• <strong>포항시(36건), 경주시(23건), 구미시(15건), 안동시(14건)</strong> 등 각 지자체별 해외 자매우호도시를 실시간으로 검색·필터링할 수 있습니다.<br>` +
        `• 상단 <strong>[경북 새마을 지도]</strong> 메뉴에서 인터랙티브 지도를 클릭하시면 시·군별 역사와 3세대 프로젝트를 확인하실 수 있습니다.`;
    }

    // 5. Thematic match: ODA / 적정기술 / 글로벌 / 수출
    if (q.includes('oda') || q.includes('적정기술') || q.includes('해외') || q.includes('아프리카') || q.includes('아시아')) {
      return `<strong>[글로벌 32개국 ODA 적정기술 매핑 전략]</strong><br><br>` +
        `경북의 고유 산업 노하우를 개발도상국 현지 수요에 맞춰 <strong>맞춤형 적정기술</strong>로 이식합니다.<br><br>` +
        `• <strong>스마트 관수/영농:</strong> 기후변화 대응 태양광 펌프 및 온실 모니터링 (중앙아시아·동남아 ODA 거점)<br>` +
        `• <strong>농산물 바이오 가공:</strong> 영양 고추·청도 감 기술 이식을 통한 현지 식품가공 마을기업 육성<br>` +
        `• <strong>평화·보은 ODA:</strong> 칠곡군 중심 6.25 참전국(에티오피아 등) 대상 자립형 식수 및 교육 인프라 지원<br>` +
        `• <strong>인재 파이프라인:</strong> 영남대 박정희새마을대학원(PSPS) 등 도내 70개국 유학생을 현지 프로젝트 매니저로 매칭합니다.`;
    }

    // 6. Thematic match: 실시간 토론 / 참여 / 댓글
    if (q.includes('토론') || q.includes('아이디어') || q.includes('참여') || q.includes('댓글')) {
      return `<strong>[청년 아이디어 실시간 소통 네트워크]</strong><br><br>` +
        `본 플랫폼은 도민과 청년 리더가 직접 정책 아이디어를 발의하고 실시간으로 피드백을 주고받는 <strong>실시간 클라우드 소통 광장</strong>을 운영 중입니다.<br><br>` +
        `• 5대 분야: <strong>지방소멸대응 / 스마트영농 / 마을기업 / 글로벌ODA / 자유제안</strong><br>` +
        `• 상단 <strong>[실시간 아이디어 토론방]</strong> 메뉴에서 바로 의견을 등록해보실 수 있습니다!`;
    }

    // General Default Advisory Consultation
    return `<strong>[경상북도 디지털새마을 AI 어드바이저]</strong><br><br>` +
      `경상북도 22개 시·군의 특화 자원과 3세대 디지털 새마을 이니셔티브에 관해 질문해 주셔서 감사합니다.<br><br>` +
      `현재 플랫폼에서는 다음과 같은 세부 컨설팅을 제공합니다:<br>` +
      `1. <strong>지자체별 ODA 모델:</strong> "영양군", "상주시", "칠곡군", "안동시", "포항시" 등을 입력해 보세요.<br>` +
      `2. <strong>핵심 메커니즘:</strong> "3축 매칭", "3세대 비전", "적정기술 ODA" 등을 질문하시면 세부 전략을 안내합니다.<br>` +
      `3. <strong>데이터 조회:</strong> "경북 지도", "176건 국제교류"를 입력하시면 통계와 연동 방안을 확인하실 수 있습니다.`;
  }

  // Dynamic Advisory Builder for any of Gyeongbuk's 22 cities
  buildCityAdvisory(cityKeyword, query) {
    let fullCityName = cityKeyword;
    if (!fullCityName.endsWith('시') && !fullCityName.endsWith('군')) {
      fullCityName = ['포항', '경주', '김천', '안동', '구미', '영주', '영천', '상주', '문경', '경산'].includes(cityKeyword)
        ? cityKeyword + '시'
        : cityKeyword + '군';
    }

    let cityData = null;
    if (typeof SAEMAUL_DATA !== 'undefined' && SAEMAUL_DATA.gyeongbukCities) {
      cityData = SAEMAUL_DATA.gyeongbukCities[fullCityName] || SAEMAUL_DATA.gyeongbukCities[cityKeyword];
    }

    let exchangeList = [];
    if (typeof SAEMAUL_DATA !== 'undefined' && SAEMAUL_DATA.gaokFullData) {
      exchangeList = SAEMAUL_DATA.gaokFullData[fullCityName] || [];
    }

    const exchangeCount = exchangeList.length;
    const topExchanges = exchangeList.slice(0, 3).map(e => `${e.country} ${e.city}(${e.type})`).join(', ');

    let projectName = cityData ? cityData.project : `${fullCityName} 3세대 디지털 새마을 육성 프로젝트`;
    let projectDesc = cityData ? cityData.desc : `${fullCityName}의 고유 자원을 기반으로 청년 창업과 글로벌 ODA를 연계합니다.`;
    let historyNote = cityData ? cityData.history : `경북의 핵심 기초 지자체로서 지역 자조 협동 역량을 보유하고 있습니다.`;

    let seniorRole = (cityData && cityData.matching3Axis) ? cityData.matching3Axis.senior : `[시니어] ${fullCityName} 토착 재배·가공 숙련 노하우 및 유휴 토지 자원 전수`;
    let youthRole = (cityData && cityData.matching3Axis) ? cityData.matching3Axis.youth : `[청년 유입] AI·디지털 기술 기반 3세대 마을기업 창업 및 인구 유입`;
    let globalRole = (cityData && cityData.matching3Axis) ? cityData.matching3Axis.global : `[글로벌] 관내 외국인 유학생 및 ODA 연수생 매핑 → 개도국 판로 개척`;

    return `<strong>[${fullCityName} 3세대 디지털 새마을 ODA 컨설팅]</strong><br><br>` +
      `<strong>1. 지역 자산 및 역사적 맥락</strong><br>` +
      `${historyNote}<br><br>` +
      `<strong>2. 3세대 핵심 프로젝트: ${projectName}</strong><br>` +
      `${projectDesc}<br><br>` +
      `<strong>3. 「시니어-청년-글로벌」 3축 융합 실행 계획</strong><br>` +
      `• ${seniorRole}<br>` +
      `• ${youthRole}<br>` +
      `• ${globalRole}<br><br>` +
      `<strong>4. 공식 해외 자매우호 교류 연동 현황 (GAOK 전수 DB)</strong><br>` +
      `• 공식 교류 실적: <strong>총 ${exchangeCount}건</strong><br>` +
      (exchangeCount > 0 ? `• 대표 교류 도시: ${topExchanges}${exchangeCount > 3 ? ` 외 ${exchangeCount - 3}건` : ''}<br>` : '') +
      `• 기대 효과: ${fullCityName}의 특화 자산이 개도국 현지 자립 거점으로 이식되어 청년 일자리 창출과 지자체 위상 제고를 동시에 달성합니다.`;
  }

  // Strip harmful script / non-Korean noise
  sanitizeResponse(text) {
    return text
      .replace(/[\u3400-\u9FFF\uF900-\uFAFF]/g, '')  // CJK characters
      .replace(/[\u0400-\u04FF]/g, '')                 // Cyrillic
      .replace(/[\u3040-\u30FF]/g, '')                 // Japanese
      .replace(/[\u0600-\u06FF]/g, '')                 // Arabic
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // Append user message instantly
  appendMessage(text, sender) {
    if (!this.container) return;
    const timeStr = this.getTimeString();

    const wrapper = document.createElement('div');
    wrapper.className = `msg-wrapper ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = `message ${sender}`;
    bubble.innerHTML = this.escapeHtml(text).replace(/\n/g, '<br>');

    const time = document.createElement('div');
    time.className = 'msg-time';
    time.textContent = timeStr;

    wrapper.appendChild(bubble);
    wrapper.appendChild(time);
    this.container.appendChild(wrapper);
    this.container.scrollTop = this.container.scrollHeight;
  }

  // Append bot message with smooth typewriter effect
  appendMessageTyping(htmlText, sender) {
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

    // Fast and smooth typewriter for HTML strings
    // If text contains HTML tags, we display directly or chunk-type
    let step = 0;
    const totalLength = htmlText.length;
    const chunkSize = 4; // 4 chars at a time for fast, smooth feel

    const type = () => {
      step += chunkSize;
      if (step < totalLength) {
        bubble.innerHTML = htmlText.substring(0, step);
        this.container.scrollTop = this.container.scrollHeight;
        setTimeout(type, 15);
      } else {
        bubble.innerHTML = htmlText;
        this.container.scrollTop = this.container.scrollHeight;
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

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
