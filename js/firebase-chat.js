/* ==========================================================================
   Firebase Real-time Chat & Community Comment Module
   Project: 글로벌 디지털 새마을 플랫폼 구축
   Backend: Firebase Firestore (saemaul-sdgs)
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
      time: "2026-09-10 14:20"
    },
    {
      id: "sample-2",
      nickname: "상주스마트팜연구원",
      category: "스마트영농",
      message: "상주시 스마트팜 혁신밸리의 데이터 기반 생육 관리 모델을 도내 북부권(봉화, 영양) 기후적응형 작물에 보급하여 청년 영농 정착률을 높입시다.",
      time: "2026-09-10 15:05"
    },
    {
      id: "sample-3",
      nickname: "청도새마을협동조합",
      category: "마을기업",
      message: "새마을 발상지 청도의 주민 자조 모델에 청년 디자이너와 라이브커머스를 결합한 3세대 감말랭이 마을기업 육성을 제안합니다.",
      time: "2026-09-10 16:30"
    },
    {
      id: "sample-4",
      nickname: "영남대PSPS글로벌연구원",
      category: "글로벌ODA",
      message: "아시아·아프리카 32개국 ODA 거점에 경북의 태양광 관수 펌프 및 농산물 가공 적정기술을 표준화하여 수출하고 현지 유학생을 코디네이터로 매칭합시다.",
      time: "2026-09-10 17:15"
    },
    {
      id: "sample-5",
      nickname: "경북디지털청년포럼",
      category: "자유제안",
      message: "도내 22개 시·군 새마을회관을 청년 공유오피스 및 디지털 코워킹 스페이스로 리모델링하여 워케이션과 지역 문제 해결을 병행하는 방안을 추천합니다.",
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
        console.log("[Firebase] Firestore connected successfully.");
      } else if (window.firebase && firebase.apps.length) {
        db = firebase.firestore();
        isFirebaseReady = true;
      }
    } catch (err) {
      console.warn("[Firebase] Initializing fallback mode:", err.message);
      isFirebaseReady = false;
    }
  }

  function setupChat() {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-message-input");
    const chatNickname = document.getElementById("chat-nickname-input");
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
            if (messages.length === 0) {
              renderChatMessages(DEFAULT_CHAT_MESSAGES);
            } else {
              renderChatMessages(messages);
            }
          },
          (err) => {
            console.warn("[Firebase] Chat snapshot fallback:", err);
            renderChatMessages(getLocalChatMessages());
          }
        );
    } else {
      renderChatMessages(getLocalChatMessages());
    }

    if (chatForm) {
      chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const text = chatInput.value.trim();
        const nickname = chatNickname.value.trim() || "익명 청년위원";
        const category = chatCategory.value || "자유제안";

        if (!text) return;

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
          time: nowStr,
          createdAt: (window.firebase && firebase.firestore && firebase.firestore.FieldValue)
            ? firebase.firestore.FieldValue.serverTimestamp()
            : Date.now()
        };

        if (isFirebaseReady && db) {
          db.collection("chat_messages")
            .add(newMsg)
            .catch((err) => {
              console.warn("[Firebase] Add message fallback:", err);
              saveLocalChatMessage(newMsg);
            });
        } else {
          saveLocalChatMessage(newMsg);
        }

        chatInput.value = "";
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
    renderChatMessages(messages);
  }

  function renderChatMessages(messages) {
    const container = document.getElementById("chat-messages-stream");
    if (!container) return;

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
        return `
        <div class="chat-message-bubble">
          <div class="chat-message-header">
            <span class="chat-author">${escapeHtml(m.nickname || "익명")}</span>
            <span class="chat-category-badge ${catClass}">${escapeHtml(m.category || "자유제안")}</span>
            <span class="chat-time">${escapeHtml(m.time || "")}</span>
          </div>
          <div class="chat-message-body">${escapeHtml(m.message || "")}</div>
        </div>
      `;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
  }

  // Quick Prompt Filling Helper
  window.fillChatPrompt = function (nickname, category, message) {
    const nickInput = document.getElementById("chat-nickname-input");
    const catSelect = document.getElementById("chat-category-select");
    const msgInput = document.getElementById("chat-message-input");
    if (nickInput) nickInput.value = nickname;
    if (catSelect) catSelect.value = category;
    if (msgInput) {
      msgInput.value = message;
      msgInput.focus();
    }
  };

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
            console.warn("[Firebase] Comments snapshot fallback:", err);
            renderComments(getLocalComments());
          }
        );
    } else {
      renderComments(getLocalComments());
    }

    if (commentForm) {
      commentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const city = citySelect ? citySelect.value : "경상북도 전체";
        const author = authorInput.value.trim() || "도민 제안자";
        const text = textInput.value.trim();

        if (!text) return;

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
          comment: text,
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
              console.warn("[Firebase] Add comment fallback:", err);
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

  function saveLocalComment(comment) {
    const list = getLocalComments();
    list.unshift({ id: "local-comment-" + Date.now(), ...comment });
    localStorage.setItem("gbsaemaul_city_comments", JSON.stringify(list));
    renderComments(list);
  }

  function renderComments(comments) {
    const container = document.getElementById("comments-display-list");
    if (!container) return;

    if (!comments || comments.length === 0) {
      container.innerHTML = '<div style="color:var(--text-muted); font-size:13px; text-align:center; padding:20px;">등록된 청년 제안 및 댓글이 없습니다. 첫 번째 의견을 남겨보세요!</div>';
      return;
    }

    container.innerHTML = comments
      .map((c) => {
        return `
        <div class="comment-item-card">
          <div class="comment-item-header">
            <div>
              <span class="comment-city-tag">${escapeHtml(c.city || "경상북도")}</span>
              <strong class="comment-author-name">${escapeHtml(c.author || "도민")}</strong>
            </div>
            <span class="comment-timestamp">${escapeHtml(c.time || "")}</span>
          </div>
          <div class="comment-content-text">${escapeHtml(c.comment || "")}</div>
          <div class="comment-actions">
            <button type="button" class="btn-like" onclick="window.likeComment('${c.id}')">
              공감 <span>${c.likes || 0}</span>
            </button>
          </div>
        </div>
      `;
      })
      .join("");
  }

  window.likeComment = function (commentId) {
    if (isFirebaseReady && db && !commentId.startsWith("local-")) {
      const ref = db.collection("city_comments").doc(commentId);
      db.runTransaction((transaction) => {
        return transaction.get(ref).then((doc) => {
          if (!doc.exists) return;
          const newLikes = (doc.data().likes || 0) + 1;
          transaction.update(ref, { likes: newLikes });
        });
      }).catch((err) => console.warn("Like update failed:", err));
    } else {
      const comments = getLocalComments();
      const target = comments.find((c) => c.id === commentId);
      if (target) {
        target.likes = (target.likes || 0) + 1;
        localStorage.setItem("gbsaemaul_city_comments", JSON.stringify(comments));
        renderComments(comments);
      }
    }
  };

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFirebase();
    setupChat();
    setupComments();
  });
})();
