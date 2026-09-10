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
  let html = '<div class="profile-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-bottom:40px;">';

  members.forEach(m => {
    const awardBadges = m.awards ? m.awards.map(a => `<div style="background:rgba(217, 119, 6, 0.1); color:var(--accent-gold); border:1px solid rgba(217, 119, 6, 0.3); padding:6px 12px; border-radius:6px; font-weight:700; font-size:12.5px; margin-bottom:6px;">${a}</div>`).join('') : '';

    const eduList = (m.education && m.education.length > 0) ? m.education.map(e => `
      <div style="font-size:12.5px; margin-bottom:5px; color:var(--text-main); line-height:1.5;">
        <strong style="color:var(--primary); font-weight:700;">${e.period}</strong> | <span>${e.desc}</span>
      </div>
    `).join('') : '';

    const careerList = (m.careers && m.careers.length > 0) ? m.careers.map(c => `
      <div style="font-size:12.5px; margin-bottom:6px; color:var(--text-main); border-left:2px solid var(--primary-border); padding-left:8px;">
        <div><strong style="color:var(--primary);">${c.period}</strong> | <strong>${c.org}</strong> <span style="color:var(--accent-blue); font-size:11.5px;">(${c.role})</span></div>
        <div style="color:var(--text-muted); font-size:12px;">${c.desc}</div>
      </div>
    `).join('') : '';

    const projectList = (m.projects && m.projects.length > 0) ? m.projects.map(p => `
      <div style="font-size:12px; margin-bottom:5px; color:var(--text-main); border-left:2px solid var(--accent-blue); padding-left:8px;">
        <strong style="color:var(--accent-blue);">${p.agency}</strong> | <strong>${p.title}</strong> <span style="color:var(--text-muted); font-size:11px;">(${p.period})</span>
      </div>
    `).join('') : '';

    let footprintHtml = '';
    if (m.footprint && Object.keys(m.footprint).length > 0) {
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
    }

    const extraSection = `
      <div style="margin-top:16px;">
        ${awardBadges}
        ${eduList ? `<h4 style="font-size:13.5px; font-weight:700; color:var(--primary); margin:12px 0 6px 0;">학력 사항</h4>${eduList}` : ''}
        ${careerList ? `<h4 style="font-size:13.5px; font-weight:700; color:var(--primary); margin:14px 0 6px 0;">주요 활동 및 경력</h4>${careerList}` : ''}
        ${projectList ? `<h4 style="font-size:13.5px; font-weight:700; color:var(--primary); margin:14px 0 6px 0;">주요 공적개발원조(ODA) 및 글로벌 프로젝트 실적</h4>${projectList}` : ''}
        ${footprintHtml ? `<h4 style="font-size:13.5px; font-weight:700; color:var(--primary); margin:14px 0 6px 0;">글로벌 발자취 및 협력 거점</h4>${footprintHtml}` : ''}
      </div>
    `;

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
    <div class="proposal-paper-wrapper" style="background:var(--bg-card); border:1px solid var(--border-color); padding:36px; border-radius:12px; font-size:14px; line-height:1.8; color:var(--text-main);">
      <div style="text-align:center; border-bottom:2px solid var(--primary); padding-bottom:20px; margin-bottom:24px;">
        <div style="display:flex; justify-content:center; align-items:center; gap:12px; margin-bottom:12px;">
          <div style="background:#ffffff; padding:4px 14px; border-radius:6px; border:1px solid var(--border-color); display:inline-flex; align-items:center;">
            <img src="images/saemaul_foundation_logo.png" alt="새마을재단" style="height:32px; width:auto; object-fit:contain;">
          </div>
        </div>
        <span style="font-size:13px; color:var(--primary); font-weight:800; letter-spacing:1px;">[새마을재단 공모 출품작] 3세대 새마을운동 가치 확산 사업</span>
        <h2 style="font-size:26px; font-weight:900; margin-top:6px; color:var(--primary);">글로벌 디지털 새마을 플랫폼 구축</h2>
        <div style="font-size:13px; color:var(--text-muted); margin-top:6px;">경상북도 디지털새마을 기획단 (팀장 최윤진 / 팀원 박문식)</div>
      </div>

      <h3 style="font-size:17px; font-weight:800; color:var(--primary); margin-top:24px;">1. 추진 배경 및 기획 목적</h3>
      <p style="color:var(--text-main); font-size:14px; line-height:1.75; margin-top:8px;">
        경북도지사는 근면·자조·협동의 새마을정신을 오늘의 시대에 맞게 재해석한 <strong>「제3세대 새마을운동」</strong>을 제안하였음. 이에 따라 기존 1세대(삽과 시멘트) 및 2세대(글로벌 나눔)를 넘어, 청년의 창의, AI·데이터 기술, 그리고 주민 자조형 비즈니스를 결합한 <strong>3세대 디지털 새마을 이니셔티브</strong>를 수립하고자 함.
      </p>
      <p style="color:var(--text-main); font-size:14px; line-height:1.75; margin-top:10px;">
        3세대 디지털 새마을의 핵심을 실천하기 위해 기초 지자체 단위의 자산을 데이터화 하고 한 눈에 볼 수 있는 <strong>새마을지도</strong>를 구축하고, 청년의 아이디어와 연계할 수 있는 방안을 고민할 수 있는 플랫폼을 제안함. 해당 플랫폼의 <strong>데모버전을 실제로 구축</strong>함으로써 실현가능성과 가시적인 성과를 제시함.
      </p>

      <h3 style="font-size:17px; font-weight:800; color:var(--primary); margin-top:24px;">2. 3대 핵심 추진 전략</h3>
      <ul style="padding-left:20px; color:var(--text-muted);">
        <li style="margin-bottom:8px;"><strong>기초 지자체 자산 데이터화 및 새마을지도 구축:</strong> 경북 22개 시·군의 176건 해외교류 자원 및 시·군별 역사·보도자료·특산품 자원을 시각화.</li>
        <li style="margin-bottom:8px;"><strong>청년 아이디어 실시간 연계 소통망:</strong> Firebase 백엔드 기반 실시간 채팅 및 시·군별 댓글 창구를 통해 청년 창업가·연구원·도민의 아이디어를 직접 수렴.</li>
        <li style="margin-bottom:8px;"><strong>글로벌 ODA 32개국 네트워크 확장:</strong> 아시아, 유럽, 아메리카, 오세아니아, 아프리카 5개 대륙 32개국과의 개발협력 및 적정기술 매핑.</li>
      </ul>

      <h3 style="font-size:17px; font-weight:800; color:var(--primary); margin-top:28px;">3. 공모 실천 분야 연계</h3>
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">

        <div style="border-left:4px solid var(--primary); padding-left:16px; background:var(--primary-light); padding:14px 16px; border-radius:0 8px 8px 0;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
            <span style="color:var(--primary); font-size:12px; font-weight:800;">[본 공모 선정 분야]</span>
            <strong style="color:var(--primary); font-size:15px; font-weight:900;">5) 기타 3세대 새마을운동 가치 확산에 기여할 수 있는 사업</strong>
          </div>
          <p style="font-size:13.5px; color:var(--text-main); line-height:1.65; margin-top:4px;">
            청년의 창의, AI·데이터 기술, 그리고 주민 자조형 비즈니스를 결합한 디지털 플랫폼을 선제적으로 구축하여 3세대 새마을운동의 미래 가치를 도내외 및 글로벌로 확산합니다.
          </p>
        </div>

        <div style="padding-left:16px; border-bottom:1px solid var(--border-color); padding-bottom:8px; font-size:13.5px; color:var(--text-muted);">
          <strong>1) 지역소멸 대응 및 지역공동체 재생:</strong> 경북 22개 시·군 유휴 자원과 외지/지역 청년 창업가 1:1 매칭
        </div>
        <div style="padding-left:16px; border-bottom:1px solid var(--border-color); padding-bottom:8px; font-size:13.5px; color:var(--text-muted);">
          <strong>2) 환경·탄소중립·도시농업 기반 공동체:</strong> 기후변화 대응 친환경 스마트 영농 모델
        </div>
        <div style="padding-left:16px; border-bottom:1px solid var(--border-color); padding-bottom:8px; font-size:13.5px; color:var(--text-muted);">
          <strong>3) 마을기업·협동조합 등 사회적경제:</strong> 주민 소유 자조형 에코 마을기업 및 글로벌 브릿지 펀딩
        </div>
        <div style="padding-left:16px; font-size:13.5px; color:var(--text-muted);">
          <strong>4) 해외 새마을사업 연계 국제협력:</strong> 5개 대륙 32개국 ODA 거점 청년 지도자 양성 및 적정기술 보급
        </div>

      </div>
    </div>
  `;
}

function printProposal() {
  window.print();
}
