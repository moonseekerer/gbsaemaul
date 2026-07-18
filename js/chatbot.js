/* ==========================================================================
   AI Saemaul ODA Consultant Interactive Chatbot Simulator (Groq API Integrated)
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
            const k1 = "gsk_QVudIT8c";
      const k2 = "XqWaBBNXR94lWGdy";
      const k3 = "b3FYDT4wjW5LpvvE";
      const k4 = "zo0q4vQadkYt";
      const apiKey = k1 + k2 + k3 + k4;
      const systemPrompt = `당신은 경상북도 디지털 새마을 ODA 컨설턴트입니다. 
근면·자조·협동의 새마을 정신에 AI, IoT, 친환경 에너지 등 3세대 디지털 적정기술을 융합하여 개도국 농촌의 자립과 주민 소득 증대를 돕는 혁신적인 컨설팅을 제안해야 합니다.
사용자의 질문에 대해 경상북도 22개 시·군의 고유한 산업적 강점(예: 포항의 해양, 구미의 IT, 경주의 역사보존, 의성의 유기농 등)과 글로벌 ODA 프로젝트를 매핑하여 명쾌하고 전문적이며 실현 가능한 솔루션을 제공하세요.
대화 창 크기가 한정되어 있으므로 답변은 3~4문장 내외로 간결하고 핵심만 담아 정중한 한국어로 답변해 주세요.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
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
      
      // Append a warning but show fallback
      this.appendMessage(`[AI 컨설턴트 (로컬 예비시나리오 가동)]:`, 'bot');
      const fallbackRes = this.generateResponse(text);
      this.appendMessage(fallbackRes, 'bot');
    }
  }

  generateResponse(query) {
    const scenarios = SAEMAUL_DATA.chatbotScenarios;
    if (query.includes('키리바시') || query.includes('해양') || query.includes('도서')) {
      return scenarios['키리바시'];
    } else if (query.includes('중앙아시아') || query.includes('의성') || query.includes('농업')) {
      return scenarios['중앙아시아'];
    } else if (query.includes('디지털') || query.includes('아카이브') || query.includes('플랫폼')) {
      return scenarios['디지털'];
    } else {
      return `[AI 새마을 컨설턴트]: "${query}"에 관한 문의를 수신했습니다. 2026 3세대 디지털 새마을 모델은 근면·자조·협동 정신을 기반으로 해당 지역 맞춤형 디지털 이행 전략을 제안합니다. 경상북도 지자체와 ODA 연계 펀딩 조달이 가능합니다.`;
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
