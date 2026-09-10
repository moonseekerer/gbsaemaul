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
      nickname: "경북청년창업가",
      category: "지방소멸대응",
      message: "의성군 청년 마늘 가공 스타트업 모델을 영양군 고추 재배 청년 농가와 연결하여 공동 브랜딩을 제안합니다.",
      time: "2026-09-10 14:20"
    },
    {
      id: "sample-2",
      nickname: "영남대PSPS연구원",
      category: "글로벌ODA",
      message: "피지 및 태평양 도서국가 기후변화 대응을 위해 경북의 스마트 관수 적정기술 매핑을 지원할 수 있습니다.",
      time: "2026-09-10 15:05"
    },
    {
      id: "sample-3",
      nickname: "디지털새마을활동가",
      category: "스마트영농",
      message: "기초 지자체 22개 시·군의 유휴 토지와 청년 창업가를 1:1 매칭하는 데이터베이스 기능이 매우 유용합니다.",
      time: "2026-09-10 16:40"
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

    container.innerHTML = messages
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
