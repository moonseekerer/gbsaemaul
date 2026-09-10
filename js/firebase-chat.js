/* ==========================================================================
   Real-time Chat & Community Comment Module (Cloud Firestore Integrated)
   Project: 글로벌 디지털 새마을 플랫폼 구축
   Features: Password Verification for Message Deletion & Administrator Mode
   ========================================================================== */

(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyBNY1W2zEV6-Exm7U0FDbtjX-zWNnJXivo",
    authDomain: "gbsaemaul-2026.firebaseapp.com",
    projectId: "gbsaemaul-2026",
    storageBucket: "gbsaemaul-2026.firebasestorage.app",
    messagingSenderId: "376617811749",
    appId: "1:376617811749:web:f31130b29cb474973da4cc",
    measurementId: "G-0Y34KT9568"
  };

  let db = null;
  let isFirebaseReady = false;

  const DEFAULT_CHAT_MESSAGES = [
    {
      id: "sample-1",
      nickname: "의성청년창업네트워크",
      category: "지방소멸대응",
      message: "의성군 청년 마늘 가공 스타트업 모델을 영양군 고추 재배 청년 농가와 연결하여 공동 브랜딩 및 유휴 농가 주택 정주 패키지를 제안합니다.",
      password: "admin",
      time: "2026-09-10 14:20"
    },
    {
      id: "sample-2",
      nickname: "상주스마트팜연구원",
      category: "스마트영농",
      message: "상주시 스마트팜 혁신밸리의 데이터 기반 생육 관리 모델을 도내 북부권(봉화, 영양) 기후적응형 작물에 보급하여 청년 영농 정착률을 높입시다.",
      password: "admin",
      time: "2026-09-10 15:05"
    },
    {
      id: "sample-3",
      nickname: "청도새마을협동조합",
      category: "마을기업",
      message: "새마을 발상지 청도의 주민 자조 모델에 청년 디자이너와 라이브커머스를 결합한 3세대 감말랭이 마을기업 육성을 제안합니다.",
      password: "admin",
      time: "2026-09-10 16:30"
    },
    {
      id: "sample-4",
      nickname: "영남대PSPS글로벌연구원",
      category: "글로벌ODA",
      message: "아시아·아프리카 32개국 ODA 거점에 경북의 태양광 관수 펌프 및 농산물 가공 적정기술을 표준화하여 수출하고 현지 유학생을 코디네이터로 매칭합시다.",
      password: "admin",
      time: "2026-09-10 17:15"
    },
    {
      id: "sample-5",
      nickname: "경북디지털청년포럼",
      category: "자유제안",
      message: "도내 22개 시·군 새마을회관을 청년 공유오피스 및 디지털 코워킹 스페이스로 리모델링하여 워케이션과 지역 문제 해결을 병행하는 방안을 추천합니다.",
      password: "admin",
      time: "2026-09-10 18:40"
    }
  ];

  const DEFAULT_COMMENTS = [
    {
      id: "comment-1",
      city: "안동시",
      author: "지역학술연구원",
      comment: "경북도청 소재지인 안동시의 46건 국제교류 자원과 청년 전통식품 비즈니스가 융합되면 큰 시너지가 기대됩니다.",
      likes: 5,
      time: "2026-09-10 16:10"
    },
    {
      id: "comment-2",
      city: "청도군",
      author: "새마을청년포럼",
      comment: "신도리 발상지의 협동정신을 디지털 아카이브로 구축하여 전 세계에 전파하는 모델을 적극 지지합니다.",
      likes: 8,
      time: "2026-09-10 17:30"
    }
  ];

  function initFirebase() {
    try {
      if (window.firebase && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        isFirebaseReady = true;
      } else if (window.firebase && firebase.apps.length) {
        db = firebase.firestore();
        isFirebaseReady = true;
      }
    } catch (err) {
      console.warn("[Cloud] Initializing fallback mode:", err.message);
      isFirebaseReady = false;
    }
  }

  function setupChat() {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-message-input");
    const chatNickname = document.getElementById("chat-nickname-input");
    const chatPassword = document.getElementById("chat-password-input");
    const chatCategory = document.getElementById("chat-category-select");
    const messageContainer = document.getElementById("chat-messages-stream");

    if (!messageContainer) return;

    if (isFirebaseReady && db) {
      db.collection("chat_messages")
        .orderBy("createdAt", "asc")
        .limitToLast(50)
        .onSnapshot(
          (snapshot) => {
            const messages = [];
            snapshot.forEach((doc) => {
              messages.push({ id: doc.id, ...doc.data() });
            });
            window.currentChatMessages = messages;
            if (messages.length === 0) {
              renderChatMessages(DEFAULT_CHAT_MESSAGES);
            } else {
              renderChatMessages(messages);
            }
          },
          (err) => {
            console.warn("[Cloud] Chat snapshot fallback:", err);
            const local = getLocalChatMessages();
            window.currentChatMessages = local;
            renderChatMessages(local);
          }
        );
    } else {
      const local = getLocalChatMessages();
      window.currentChatMessages = local;
      renderChatMessages(local);
    }

    if (chatForm) {
      chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const text = chatInput.value.trim();
        const nickname = chatNickname.value.trim() || "익명 청년위원";
        const category = chatCategory.value || "자유제안";
        const password = chatPassword ? chatPassword.value.trim() : "";

        if (!text) return;
        if (!password) {
          alert("게시글 관리를 위해 비밀번호(4자리 이상)를 입력해주세요.");
          if (chatPassword) chatPassword.focus();
          return;
        }

        const nowStr = new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });

        const newMsg = {
          nickname: nickname,
          category: category,
          message: text,
          password: password,
          time: nowStr,
          createdAt: (window.firebase && firebase.firestore && firebase.firestore.FieldValue)
            ? firebase.firestore.FieldValue.serverTimestamp()
            : Date.now()
        };

        if (isFirebaseReady && db) {
          db.collection("chat_messages")
            .add(newMsg)
            .catch((err) => {
              console.warn("[Cloud] Add message fallback:", err);
              saveLocalChatMessage(newMsg);
            });
        } else {
          saveLocalChatMessage(newMsg);
        }

        chatInput.value = "";
        if (chatPassword) chatPassword.value = "";
      });
    }
  }

  function getLocalChatMessages() {
    const saved = localStorage.getItem("gbsaemaul_chat_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CHAT_MESSAGES;
      }
    }
    return DEFAULT_CHAT_MESSAGES;
  }

  function saveLocalChatMessage(msg) {
    const messages = getLocalChatMessages();
    messages.push({ id: "local-" + Date.now(), ...msg });
    localStorage.setItem("gbsaemaul_chat_messages", JSON.stringify(messages));
    window.currentChatMessages = messages;
    renderChatMessages(messages);
  }

  function renderChatMessages(messages) {
    const container = document.getElementById("chat-messages-stream");
    if (!container) return;

    window.currentChatMessages = messages;
    const isAdmin = sessionStorage.getItem("gbsaemaul_admin_auth") === "true";

    // Filter out test or invalid messages
    const validMessages = messages.filter((m) => {
      if (!m || !m.message) return false;
      const t = m.message.trim();
      if (t === "ㅇ" || t === "테스트" || t === "테스트입니다" || t.includes("연동 테스트")) {
        return false;
      }
      return true;
    });

    const displayList = validMessages.length > 0 ? validMessages : DEFAULT_CHAT_MESSAGES;

    container.innerHTML = displayList
      .map((m) => {
        const catClass = getCategoryBadgeClass(m.category);
        const delBtnLabel = isAdmin ? "관리자삭제" : "삭제";
        const delBtnClass = isAdmin ? "chat-del-btn admin-active" : "chat-del-btn";
        return `
        <div class="chat-message-bubble" id="msg-${m.id}">
          <div class="chat-message-header">
            <span class="chat-author">${escapeHtml(m.nickname || "익명")}</span>
            <span class="chat-category-badge ${catClass}">${escapeHtml(m.category || "자유제안")}</span>
            <span class="chat-time">${escapeHtml(m.time || "")}</span>
            <button type="button" class="${delBtnClass}" onclick="deleteChatMessage('${m.id}')" title="${isAdmin ? '관리자 즉시 삭제' : '비밀번호 확인 후 삭제'}">${delBtnLabel}</button>
          </div>
          <div class="chat-message-body">${escapeHtml(m.message || "")}</div>
        </div>
      `;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
  }

  // Quick Prompt Filling Helper (with default test password)
  window.fillChatPrompt = function (nickname, category, message) {
    const nickInput = document.getElementById("chat-nickname-input");
    const catSelect = document.getElementById("chat-category-select");
    const msgInput = document.getElementById("chat-message-input");
    const pwInput = document.getElementById("chat-password-input");
    if (nickInput) nickInput.value = nickname;
    if (catSelect) catSelect.value = category;
    if (pwInput) pwInput.value = "1234";
    if (msgInput) {
      msgInput.value = message;
      msgInput.focus();
    }
  };

  // Delete Chat Message with Password Verification or Admin Bypass
  window.deleteChatMessage = function (id) {
    const isAdmin = sessionStorage.getItem("gbsaemaul_admin_auth") === "true";
    const currentList = window.currentChatMessages || DEFAULT_CHAT_MESSAGES;
    const targetMsg = currentList.find((m) => m.id === id);

    if (isAdmin) {
      const authorName = targetMsg ? targetMsg.nickname : "선택된";
      if (!confirm(`관리자 권한으로 '${authorName}' 님의 제안글을 즉시 삭제하시겠습니까?`)) {
        return;
      }
      executeDelete(id);
    } else {
      const enteredPw = prompt("게시글 등록 시 설정한 비밀번호를 입력하세요:");
      if (!enteredPw) return;

      if (targetMsg && targetMsg.password && targetMsg.password === enteredPw) {
        executeDelete(id);
      } else if (targetMsg && !targetMsg.password) {
        alert("이 게시글은 시스템 예시글로, 관리자 모드에서만 삭제할 수 있습니다.\n(사이드바의 '관리자 모드 접속'을 이용하세요.)");
      } else {
        alert("비밀번호가 일치하지 않습니다. 올바른 비밀번호를 입력해주세요.");
      }
    }
  };

  function executeDelete(id) {
    if (isFirebaseReady && db && !id.startsWith("sample-")) {
      db.collection("chat_messages")
        .doc(id)
        .delete()
        .then(() => {
          alert("게시글이 성공적으로 삭제되었습니다.");
        })
        .catch((err) => {
          console.warn("[Cloud] Delete failed, deleting locally:", err);
          deleteLocalChatMessage(id);
          alert("게시글이 삭제되었습니다.");
        });
    } else {
      deleteLocalChatMessage(id);
      alert("게시글이 삭제되었습니다.");
    }
  }

  function deleteLocalChatMessage(id) {
    let messages = getLocalChatMessages();
    messages = messages.filter((m) => m.id !== id);
    localStorage.setItem("gbsaemaul_chat_messages", JSON.stringify(messages));
    
    // Also remove from DEFAULT_CHAT_MESSAGES if it was a sample
    const idx = DEFAULT_CHAT_MESSAGES.findIndex((m) => m.id === id);
    if (idx !== -1) DEFAULT_CHAT_MESSAGES.splice(idx, 1);

    window.currentChatMessages = messages;
    renderChatMessages(messages);
  }

  // Admin Mode Login & Toggle System
  window.toggleAdminMode = function () {
    const isAuth = sessionStorage.getItem("gbsaemaul_admin_auth") === "true";
    if (isAuth) {
      sessionStorage.removeItem("gbsaemaul_admin_auth");
      alert("관리자 모드에서 로그아웃되었습니다.");
      updateAdminUI();
      if (window.currentChatMessages) renderChatMessages(window.currentChatMessages);
    } else {
      const pw = prompt("관리자 비밀번호를 입력하세요:");
      if (pw === "0716") {
        sessionStorage.setItem("gbsaemaul_admin_auth", "true");
        alert("관리자 인증이 완료되었습니다.\n이제 모든 게시글에 대한 삭제 권한이 활성화됩니다.");
        updateAdminUI();
        if (window.currentChatMessages) renderChatMessages(window.currentChatMessages);
      } else if (pw !== null) {
        alert("관리자 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  function updateAdminUI() {
    const isAuth = sessionStorage.getItem("gbsaemaul_admin_auth") === "true";
    const badge = document.getElementById("chat-admin-badge");
    const btn = document.getElementById("chat-admin-btn");

    if (isAuth) {
      if (badge) {
        badge.textContent = "관리자 인증됨";
        badge.style.background = "#dcfce7";
        badge.style.color = "#15803d";
        badge.style.border = "1px solid #86efac";
      }
      if (btn) {
        btn.textContent = "관리자 로그아웃";
        btn.style.borderColor = "#dc2626";
        btn.style.color = "#dc2626";
      }
      document.body.classList.add("admin-mode-active");
    } else {
      if (badge) {
        badge.textContent = "일반 모드";
        badge.style.background = "#f1f5f9";
        badge.style.color = "#64748b";
        badge.style.border = "none";
      }
      if (btn) {
        btn.textContent = "관리자 모드 접속";
        btn.style.borderColor = "var(--border-color)";
        btn.style.color = "var(--primary)";
      }
      document.body.classList.remove("admin-mode-active");
    }
  }

  function getCategoryBadgeClass(cat) {
    switch (cat) {
      case "지방소멸대응":
        return "badge-ext-orange";
      case "스마트영농":
        return "badge-ext-green";
      case "마을기업":
        return "badge-ext-blue";
      case "글로벌ODA":
        return "badge-ext-purple";
      default:
        return "badge-ext-gray";
    }
  }

  function setupComments() {
    const commentForm = document.getElementById("comment-submit-form");
    const citySelect = document.getElementById("comment-city-select");
    const authorInput = document.getElementById("comment-author-input");
    const textInput = document.getElementById("comment-text-input");
    const commentsList = document.getElementById("comments-display-list");

    if (!commentsList) return;

    if (isFirebaseReady && db) {
      db.collection("city_comments")
        .orderBy("createdAt", "desc")
        .limit(30)
        .onSnapshot(
          (snapshot) => {
            const comments = [];
            snapshot.forEach((doc) => {
              comments.push({ id: doc.id, ...doc.data() });
            });
            if (comments.length === 0) {
              renderComments(DEFAULT_COMMENTS);
            } else {
              renderComments(comments);
            }
          },
          (err) => {
            console.warn("[Cloud] Comments snapshot fallback:", err);
            renderComments(getLocalComments());
          }
        );
    } else {
      renderComments(getLocalComments());
    }

    if (commentForm) {
      commentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const city = citySelect.value || "경상북도 전체";
        const author = authorInput.value.trim() || "도민";
        const comment = textInput.value.trim();

        if (!comment) return;

        const nowStr = new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });

        const newComment = {
          city: city,
          author: author,
          comment: comment,
          likes: 0,
          time: nowStr,
          createdAt: (window.firebase && firebase.firestore && firebase.firestore.FieldValue)
            ? firebase.firestore.FieldValue.serverTimestamp()
            : Date.now()
        };

        if (isFirebaseReady && db) {
          db.collection("city_comments")
            .add(newComment)
            .catch((err) => {
              console.warn("[Cloud] Add comment fallback:", err);
              saveLocalComment(newComment);
            });
        } else {
          saveLocalComment(newComment);
        }

        textInput.value = "";
      });
    }
  }

  function getLocalComments() {
    const saved = localStorage.getItem("gbsaemaul_city_comments");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_COMMENTS;
      }
    }
    return DEFAULT_COMMENTS;
  }

  function saveLocalComment(comm) {
    const comments = getLocalComments();
    comments.unshift({ id: "local-c-" + Date.now(), ...comm });
    localStorage.setItem("gbsaemaul_city_comments", JSON.stringify(comments));
    renderComments(comments);
  }

  function renderComments(comments) {
    const commentsList = document.getElementById("comments-display-list");
    if (!commentsList) return;

    commentsList.innerHTML = comments
      .map((c) => {
        return `
        <div class="comment-card" id="comm-${c.id}">
          <div class="comment-card-header">
            <span class="comment-city-badge">${escapeHtml(c.city || "경상북도")}</span>
            <span class="comment-author">${escapeHtml(c.author || "도민")}</span>
            <span class="comment-time">${escapeHtml(c.time || "")}</span>
            <button type="button" class="comment-like-btn" onclick="likeComment('${c.id}')" title="공감하기">
              공감 <span id="like-count-${c.id}">${c.likes || 0}</span>
            </button>
          </div>
          <div class="comment-text">${escapeHtml(c.comment || "")}</div>
        </div>
      `;
      })
      .join("");
  }

  window.likeComment = function (id) {
    if (isFirebaseReady && db && !id.startsWith("local-") && !id.startsWith("comment-")) {
      const docRef = db.collection("city_comments").doc(id);
      docRef
        .update({
          likes: firebase.firestore.FieldValue.increment(1)
        })
        .catch((err) => {
          console.warn("[Cloud] Like update fallback:", err);
          updateLocalLike(id);
        });
    } else {
      updateLocalLike(id);
    }
  };

  function updateLocalLike(id) {
    const comments = getLocalComments();
    const target = comments.find((c) => c.id === id);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      localStorage.setItem("gbsaemaul_city_comments", JSON.stringify(comments));
      renderComments(comments);
    } else {
      const el = document.getElementById(`like-count-${id}`);
      if (el) {
        const cur = parseInt(el.textContent, 10) || 0;
        el.textContent = cur + 1;
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    initFirebase();
    setupChat();
    setupComments();
    updateAdminUI();
  });
})();
