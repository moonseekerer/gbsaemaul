/* ==========================================================================
   AI Saemaul ODA Consultant Interactive Chatbot Simulator
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

  handleUserSend() {
    const text = this.input.value.trim();
    if (!text) return;

    // Append User Message
    this.appendMessage(text, 'user');
    this.input.value = '';

    // Simulate Bot Thinking & Typing
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const botResponse = this.generateResponse(text);
      this.appendMessage(botResponse, 'bot');
    }, 900);
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
    msgDiv.innerHTML = text;

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
