/* ==========================================================================
   Workspace Renderer & Team Profile Document Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderTeamProfiles();
  renderRoadmap();
  renderProposalDocument();
});

function renderTeamProfiles() {
  const container = document.getElementById('team-profile-container');
  if (!container || !SAEMAUL_DATA.platformInfo) return;

  const members = SAEMAUL_DATA.platformInfo.members;
  let html = '<div class="profile-grid" style="display:grid; grid-template-columns:1fr 1.2fr; gap:24px; margin-bottom:40px;">';

  members.forEach(m => {
    let extraSection = '';

    if (m.name === "박문식") {
      const awardBadges = m.awards ? m.awards.map(a => `<div style="background:rgba(217, 119, 6, 0.1); color:var(--accent-gold); border:1px solid rgba(217, 119, 6, 0.3); padding:6px 12px; border-radius:6px; font-weight:700; font-size:12.5px; margin-bottom:6px;">${a}</div>`).join('') : '';

      const eduList = m.education.map(e => `
        <div style="font-size:12.5px; margin-bottom:4px; color:var(--text-main);">
          <strong style="color:var(--primary); font-family:var(--font-mono);">${e.period}</strong> | ${e.desc}
        </div>
      `).join('');

      let footprintHtml = '';
      for (const [region, countries] of Object.entries(m.footprint)) {
        footprintHtml += `
          <div style="margin-bottom:8px;">
            <div style="font-size:12px; font-weight:700; color:var(--primary); margin-bottom:4px;">${region} (${countries.length}개국)</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              ${countries.map(c => `<span style="background:var(--bg-primary); border:1px solid var(--border-color); font-size:11px; padding:2px 8px; border-radius:4px;">${c}</span>`).join('')}
            </div>
          </div>
        `;
      }

      extraSection = `
        <div style="margin-top:16px;">
          ${awardBadges}
          <h4 style="font-size:14px; font-weight:700; color:var(--primary); margin:14px 0 6px 0;">🎓 학력 사항</h4>
          ${eduList}
          <h4 style="font-size:14px; font-weight:700; color:var(--primary); margin:14px 0 6px 0;">🌍 글로벌 발자취 (전 세계 5개 대륙 32개국)</h4>
          ${footprintHtml}
        </div>
      `;
    }

    const roleSpan = m.role ? ` <span style="font-size:15px; color:var(--text-muted); font-weight:normal;">(${m.role})</span>` : '';

    html += `
      <div class="official-card" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <span style="background:var(--primary-light); color:var(--primary); font-size:12px; font-weight:700; padding:2px 8px; border-radius:4px;">${m.badge}</span>
              <h3 style="font-size:24px; font-weight:800; margin-top:4px;">${m.name}${roleSpan}</h3>
              <div style="font-size:13px; color:var(--accent-blue); font-weight:600; margin-top:2px;">${m.title}</div>
            </div>
            <div class="avatar-ph">${m.name[0]}</div>
          </div>

          <p style="font-size:13.5px; color:var(--text-muted); line-height:1.6; margin-bottom:12px;">${m.intro}</p>
          ${extraSection}
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  if (container) {
    container.innerHTML = '';
  }
}

function renderProposalDocument() {
  const container = document.getElementById('proposal-paper-content');
  if (!container) return;

  container.innerHTML = `
    <div style="background:var(--bg-card); border:1px solid var(--border-color); padding:36px; border-radius:12px; font-size:14px; line-height:1.8; color:var(--text-main);">
      <div style="text-align:center; border-bottom:2px solid var(--primary); padding-bottom:20px; margin-bottom:24px;">
        <span style="font-size:13px; color:var(--primary); font-weight:700; letter-spacing:1px;">TECHNICAL PROPOSAL & FRAMEWORK</span>
        <h2 style="font-size:26px; font-weight:900; margin-top:6px; color:var(--primary);">경상북도 새마을 플랫폼 실천 프레임워크</h2>
        <div style="font-size:13px; color:var(--text-muted); margin-top:6px;">경상북도 디지털새마을 기획단 (최윤진 팀장 / 박문식)</div>
      </div>

      <h3 style="font-size:17px; font-weight:800; color:var(--primary); margin-top:24px;">1. 추진 배경 및 기획 목적</h3>
      <p style="color:var(--text-muted);">
        2026년 6월 24일 이철우 경북도지사는 근면·자조·협동의 새마을정신을 오늘의 시대에 맞게 재해석한 「제3세대 새마을운동」을 제안하였습니다. 기존 1세대(삽과 시멘트) 및 2세대(글로벌 나눔)를 넘어, 청년의 창의, AI·데이터 기술, 그리고 주민 자조형 친환경 비즈니스를 결합한 3세대 디지털 새마을 이니셔티브를 수립하고자 합니다.
      </p>

      <h3 style="font-size:17px; font-weight:800; color:var(--primary); margin-top:24px;">2. 3대 핵심 추진 전략</h3>
      <ul style="padding-left:20px; color:var(--text-muted);">
        <li style="margin-bottom:8px;"><strong>청년 디지털 지도자 양성:</strong> 개발도상국 현지 청년 리더 대상 IT 인프라 교육 및 스마트 새마을 지도자 커리큘럼 운영.</li>
        <li style="margin-bottom:8px;"><strong>AI 지식 아카이브 & 모바일 컨설팅:</strong> 50년 영농·적정기술 지식을 LLM 대화형 챗봇으로 구축하여 다국어로 현지 문제 해결.</li>
        <li style="margin-bottom:8px;"><strong>자조형 친환경 마을기업 링킹:</strong> 경상북도 22개 시·군의 기술 자원과 현지 농수산 협동조합을 연결하여 지속가능 자립 펀드 조성.</li>
      </ul>

      <h3 style="font-size:17px; font-weight:800; color:var(--primary); margin-top:28px;">3. 3세대 새마을운동 핵심 공모 및 실천 분야</h3>
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:12px;">

        <!-- 1번 최우선 강조 파트 -->
        <div style="background:var(--primary-light); border:2px solid var(--primary-border); padding:18px 20px; border-radius:8px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
            <span style="background:var(--primary); color:#ffffff; font-size:11.5px; font-weight:800; padding:3px 10px; border-radius:4px;">★ 최우선 중점 공모 분야</span>
            <strong style="color:var(--primary); font-size:15.5px; font-weight:900;">1) 지역소멸 대응 및 지역공동체 재생, 고령친화·세대통합, 청년 정주 프로그램</strong>
          </div>
          <p style="font-size:13.5px; color:var(--text-main); line-height:1.65; margin-top:4px;">
            경상북도 22개 시·군의 가장 절박하고 시급한 과제인 <strong>지방소멸 위기 극복</strong>을 목표로, 청년이 돌아와 정주하고 어르신과 청년세대가 AI·디지털 기술로 함께 협동하여 마을 활력을 되찾는 선도적 공동체 재생 모델을 최우선으로 지원하고 강조합니다.
          </p>
        </div>

        <!-- 2번 ~ 5번 일반 공모 분야 -->
        <div style="background:var(--bg-sub); border:1px solid var(--border-color); padding:14px 18px; border-radius:6px; font-size:13.5px;">
          <strong style="color:var(--text-main); font-weight:800;">2) 환경·탄소중립·도시농업 기반 공동체 사업:</strong> 기후변화 대응 친환경 스마트 유기농 및 탄소중립 마을 모델
        </div>
        <div style="background:var(--bg-sub); border:1px solid var(--border-color); padding:14px 18px; border-radius:6px; font-size:13.5px;">
          <strong style="color:var(--text-main); font-weight:800;">3) 마을기업·협동조합 등 사회적경제 모델:</strong> 주민 소유 자조형 에코 마을기업 및 소득 증대 펀딩
        </div>
        <div style="background:var(--bg-sub); border:1px solid var(--border-color); padding:14px 18px; border-radius:6px; font-size:13.5px;">
          <strong style="color:var(--text-main); font-weight:800;">4) 해외 새마을사업 연계 국제협력 분야:</strong> 개도국 거점 청년 지도자 양성 및 적정기술 보급
        </div>
        <div style="background:var(--bg-sub); border:1px solid var(--border-color); padding:14px 18px; border-radius:6px; font-size:13.5px;">
          <strong style="color:var(--text-main); font-weight:800;">5) 기타 3세대 새마을운동 가치 확산 사업:</strong> 미래세대 교육 및 디지털 새마을 생태계 조성
        </div>

      </div>
    </div>
  `;
}

function printProposal() {
  window.print();
}
