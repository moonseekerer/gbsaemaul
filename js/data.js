/* ==========================================================================
   Saemaul 새마을 프로젝트 Platform Main Data Store
   Includes parsed GAOK 176 records & official municipality statistics
   ========================================================================== */

const SAEMAUL_DATA = {
  platformInfo: {
    title: "글로벌 디지털 새마을 새마을 프로젝트 기획단",
    subTitle: "경상북도 22개 시·군 연계 3세대 디지털 새마을 새마을 프로젝트 실천 플랫폼",
    members: [
      {
        name: "최윤진",
        role: "기획단 팀장",
        badge: "기획 총괄",
        title: "글로벌 디지털 새마을 새마을 프로젝트 기획 총괄",
        intro: "경상북도 22개 시·군 새마을 프로젝트 연계 이니셔티브 및 3세대 경상북도 디지털새마을 플랫폼 사업 총괄 기획자입니다.",
        education: [],
        careers: [],
        footprint: {}
      },
      {
        name: "박문식",
        role: "",
        badge: "기술/기획 전임",
        title: "2026 AI 새마을-SDGs 아이디어 공모전 대상 수상자",
        intro: "2026년 AI 기반 새마을-SDGs 공모전 대상 및 2025 KOICA 이사장 표창을 수상한 새마을 프로젝트 적정기술 전문가입니다.",
        awards: [
          "🏆 2026 AI 기반 새마을-SDGs 아이디어 공모전 대상 (1위)",
          "🏅 2025 KOICA (한국국제협력단) 이사장 표창"
        ],
        education: [
          { period: "2024 - 현재", desc: "영남대학교 대학원 새마을국제개발학과 박사과정" },
          { period: "2020 - 2022", desc: "영남대학교 대학원 새마을국제개발학과 석사 졸업" }
        ],
        careers: [
          { period: "2023 - 현재", desc: "글로벌 새마을 프로젝트 적정기술 및 디지털 새마을 프레임워크 연구" },
          { period: "2018 - 2022", desc: "개도국 현지 청년 지도자 교육 및 자립형 커뮤니티 컨설팅" }
        ],
        footprint: {
          "아시아": ["베트남", "몽골", "캄보디아", "라오스", "필리핀", "인도네시아"],
          "아프리카": ["르완다", "탄자니아", "우간다", "에티오피아", "세네갈"],
          "태평양 도서국": ["키리바시", "피지", "사모아", "동티모르"]
        }
      }
    ]
  },

  // 22개 시·군별 실제 보도자료 & 새마을 역사 & 3세대 새마을 프로젝트 프로젝트 메타데이터
  gyeongbukCities: {
    "청도군": {
        "officialSiteUrl": "https://www.cheongdo.go.kr",
        "news": "[보도] 청도군, 대한민국환경대상 자원순환 부문 7년 연속 대상",
        "newsUrl": "https://sports.donga.com/region/article/all/20260710/134273370/1",
        "history": "1969년 수해 복구 당시 박정희 대통령이 신도리 마을의 협동 정신을 치하하며 새마을운동의 모태로 삼은 공식 발상지입니다.",
        "project": "🌱 새마을 발상지 정신 계승 & 글로벌 자조형 에코 마을 프로젝트",
        "desc": "발상지 청도의 주민 협동 노하우를 베트남·스리랑카 등 개도국 마을기업과 직접 연결하여 주민 자립 생태계를 확장합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 신도리 발상지 협동 노하우 & 청도 감·버섯 특산품 원물 자원 제공",
            "youth": "🌱 [청년 유입] 청도 특산품 기반 에코 가공식품 & 농촌 체험 마을기업 청년 창업가 유입",
            "global": "🌐 [글로벌] 경북 거주 베트남·스리랑카 유학생 및 초청 연수생 매핑 ➔ 현지 시범마을 수출"
        }
    },
    "포항시": {
        "officialSiteUrl": "https://www.pohang.go.kr",
        "news": "[보도] "일회용품 대신 다회용기"…포항새마을부녀회, 탄소중립 실천 캠페인",
        "newsUrl": "https://www.kbsm.net/news/view.php?idx=526925",
        "history": "1971년 박정희 대통령이 전국 시장·군수 회의에서 '문성리와 같이 새마을운동을 하라'고 지시한 새마을 표준 모델 마을입니다.",
        "project": "🌊 해양 적정기술 & 2차전지 에코 마을기업 프로젝트",
        "desc": "문성리의 자조 정신과 포항의 해양·친환경 소재 기술을 개도국 어촌 커뮤니티 소득 증대에 매핑합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 문성리 새마을 리더 노하우 & 포항 해양 수산 현장 자원 전수",
            "youth": "🌱 [청년 유입] 2차전지·해양 소재 적정기술 및 스마트 수산 가공 청년 창업가 유입",
            "global": "🌐 [글로벌] 포스텍·한동대 외국인 유학생 & 인도네시아·필리핀 어촌 청년 연수생 매핑"
        }
    },
    "구미시": {
        "officialSiteUrl": "https://www.gumi.go.kr",
        "news": "[보도] 박윤경구미시의원 "잠긴새마을테마촌, 열린 관광공간으로"",
        "newsUrl": "https://www.kyongbuk.co.kr/news/articleView.html?idxno=4078401",
        "history": "(사)새마을재단 본부가 위치한 대한민국 새마을운동의 핵심 거점이자, 박정희 대통령 생가 소재지로서 베트남 짱방시 및 가나 등 개도국에 디지털 새마을 기술을 전수하고 있습니다.",
        "project": "📱 스마트 IT 센서 & 개도국 청년 디지털 센터 프로젝트",
        "desc": "구미의 전자기기·ICT 스마트 인프라를 활용하여 개도국 청년 디지털 지도자를 육성하고 아카이브 구축을 지원합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 구미 산업단지 은퇴 엔지니어·기술 숙련 시니어 재능 기부 멘토링",
            "youth": "🌱 [청년 유입] 스마트 IoT 농업 센서 & 디지털 아카이브 소프트웨어 청년 벤처 유입",
            "global": "🌐 [글로벌] 금오공대 외국인 유학생 & 베트남 짱방시 초청 디지털 청년 지도자 매핑"
        }
    },
    "경산시": {
        "officialSiteUrl": "https://www.gbgs.go.kr",
        "news": "[보도] 아진산업,경산시새마을회에 승합차 기증…봉사활동 활용",
        "newsUrl": "https://www.newsis.com/view/NISX20260703_0003694486",
        "history": "전 세계 70여 개국 800여 명의 개도국 고위 공무원 및 청년 리더에게 새마을학 및 지역개발 석사 커리큘럼을 전수해 온 대한민국 글로벌 새마을 교육의 중심지입니다.",
        "project": "🎓 글로벌 3세대 새마을 석사·디지털 리더 양성 파이프라인",
        "desc": "경산의 학술 인프라와 3세대 AI 기술을 결합하여 개도국 청년 지도자 300명을 디지털 아카데미 전문 인재로 양성합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 경산 학술 전문가 & 대추·식품 가공 시니어 농가 노하우 제공",
            "youth": "🌱 [청년 유입] 에듀테크 & 글로벌 ODA 컨설팅 청년 스타트업 유입",
            "global": "🌐 [글로벌] 영남대 PSPS 70개국 외국인 석사 장학생 & 개도국 현지 관료 매핑"
        }
    },
    "칠곡군": {
        "officialSiteUrl": "https://www.chilgok.go.kr",
        "news": "[보도] 새마을재단,칠곡군외국인 계절근로자 대상새마을교육 실시",
        "newsUrl": "https://www.hidomin.com/news/articleView.html?idxno=712761",
        "history": "칠곡군은 6.25 전쟁 참전국인 에티오피아의 디키체 마을에 새마을 회관을 건립하고 식수관을 설치하는 등 보은 사업을 지속해 왔습니다.",
        "project": "🕊️ 참전 보은 평화 새마을 & 자립형 농촌 마을기업 프로젝트",
        "desc": "에티오피아 등 동아프리카 마을에 자조형 친환경 농업 인프라와 청년 지도자 컨설팅을 제공합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 칠곡할매 한글문화 자원 & 참전 보은 은퇴 어르신 멘토단",
            "youth": "🌱 [청년 유입] 평화 콘텐츠 & 아프리카 공정무역 커피·농산물 청년 창업가 유입",
            "global": "🌐 [글로벌] 에티오피아 등 참전국 현지 청년 연수생 & 경북 다문화 청년 매핑"
        }
    },
    "안동시": {
        "officialSiteUrl": "https://www.andong.go.kr/main.do",
        "news": "[보도] 안동시새마을회, '안동시청년새마을연대 발대식' 개최",
        "newsUrl": "https://www.imaeil.com/page/view/2026062409543265271",
        "history": "경상북도 본청(도청)이 위치한 광역 행정 중심지로, 경북 22개 시·군의 행정력과 해외 32개국 교류망을 총괄 지휘하고 있습니다.",
        "project": "🏛️ 3세대 디지털 새마을 광역 거점 & AI 거버넌스",
        "desc": "경북도청의 행정력과 새마을재단의 현지 네트워크를 결합하여 22개 시·군 적정기술 매핑을 지원합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 안동 유교 전통문화 거상 & 백신·바이오 농가 시니어 자원 제공",
            "youth": "🌱 [청년 유입] AI 거버넌스 & 디지털 새마을 플랫폼 기획 청년 인재 유입",
            "global": "🌐 [글로벌] (사)경상북도 새마을재단 해외 10개국 현지 사무소 코디네이터 매핑"
        }
    },
    "경주시": {
        "officialSiteUrl": "https://www.gyeongju.go.kr",
        "news": "[보도] 경주시새마을, 위기 속 '연대의 경제'로 방향 잡다...새마을의 날 기념",
        "newsUrl": "https://www.hidomin.com/news/articleView.html?idxno=702304",
        "history": "베트남 찌에우퐁현과 자매결연을 맺고 새마을 버섯 재배사 및 마을도로 정비 프로젝트를 추진해 왔으며, 신라 천년 문화유산 관리 노하우를 전수합니다.",
        "project": "🏛️ 역사문화유산 스마트 보존 & 농가소득 증대 프로젝트",
        "desc": "문화재 보존 스마트 솔루션과 시범마을 소득증대 기술을 동남아 자매 도시와 교류합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 신라 천년 문화재 장인 & 경주 버섯·축산 시니어 농가 자원",
            "youth": "🌱 [청년 유입] 스마트 문화유산 3D 뷰어 & 웰니스 관광 청년 벤처 유입",
            "global": "🌐 [글로벌] 베트남 찌에우퐁현 연수생 & 경주 역사문화 교류 외국인 학자 매핑"
        }
    },
    "상주시": {
        "officialSiteUrl": "https://www.sangju.go.kr",
        "news": "[보도] 상주시새마을부녀회, 선진가정문화 실천다짐대회 개최",
        "newsUrl": "https://www.hidomin.com/news/articleView.html?idxno=713011",
        "history": "대한민국 농업 혁신의 중심지로서 곶감·쌀 농업 노하우 및 첨단 스마트팜 온실 제어 기술을 우즈베키스탄 등 중앙아시아 국가에 전수하고 있습니다.",
        "project": "🌾 스마트팜 온실 제어 & 중앙아시아 수확후 콜드체인 프로젝트",
        "desc": "상주의 첨단 농업 기술과 스마트 챗봇 아카이브를 결합하여 개도국 농가 수확후 손실률을 30% 이상 절감합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 상주 곶감·쌀 대가 시니어 농업인의 평생 생육 데이터 제공",
            "youth": "🌱 [청년 유입] 스마트팜 AI 온실 제어 & 콜드체인 가공 청년 창업가 유입",
            "global": "🌐 [글로벌] 우즈베키스탄·중앙아시아 농업 유학생 & 현지 청년 농업 지도자 매핑"
        }
    },
    "영주시": {
        "officialSiteUrl": "https://www.yeongju.go.kr",
        "news": "[보도] 영주시새마을회, 56주년 기념으로 지역사회 결속 다지다",
        "newsUrl": "https://www.viva100.com/article/20260423500920",
        "history": "풍기인삼 등 고부가가치 한방 약용작물 재배 기술을 기반으로 동남아 농촌 자립 및 바이오 소재 농업 기술 교류를 지속하고 있습니다.",
        "project": "🌿 고부가가치 약용작물 & 친환경 스마트 영농 프로젝트",
        "desc": "라오스 및 태평양 지역에 약용작물 가공 기술과 자조형 마을 협동조합 펀딩을 매핑합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 풍기인삼 100년 전통 약용작물 수확·증포 시니어 노하우",
            "youth": "🌱 [청년 유입] 한방 바이오 화장품 & 건강기능식품 청년 스타트업 유입",
            "global": "🌐 [글로벌] 라오스·캄보디아 농업 연수생 & 경북 한의학 외국인 유학생 매핑"
        }
    },
    "영천시": {
        "officialSiteUrl": "https://www.yc.go.kr",
        "news": "[보도] 영천시,새마을운동종합평가대회 개최",
        "newsUrl": "http://www.metroseoul.co.kr/article/20251217500404",
        "history": "샤인머스캣, 과수 및 한방 산업의 거점으로서 중국, 베트남 지자체와의 자매결연을 통해 스마트 농업 인프라를 교류해 왔습니다.",
        "project": "🍇 과수 스마트 하우스 & 친환경 에코 농업 링킹 프로젝트",
        "desc": "영천의 과수 시설 재배 적정기술을 동남아 현지 청년 지도자 농가에 보급합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 영천 샤인머스캣·포도 당도 관리 시니어 마스터 노하우",
            "youth": "🌱 [청년 유입] 과수 스마트 비가림 시설 & 와이너리 브랜딩 청년 창업가 유입",
            "global": "🌐 [글로벌] 베트남·중국 자매도시 농업 교류 청년 & 경북 거주 다문화 가계 매핑"
        }
    },
    "김천시": {
        "officialSiteUrl": "https://www.gc.go.kr",
        "news": "[보도] 김천시,새마을클린UP! 그린UP! 챌린지",
        "newsUrl": "https://view.asiae.co.kr/article/2026061912172449070",
        "history": "한국도로공사 등 혁신도시 공공기관과 협력하여 캄보디아, 베트남 등 개도국에 교육 시설 지원 및 자립 마을 봉사단을 파견했습니다.",
        "project": "🚀 스마트 물류 융합 & 개도국 청년 교육 센터 프로젝트",
        "desc": "혁신도시 공공 인프라 노하우를 활용하여 개도국 청년 스마트 IT 아카데미를 운영합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 혁신도시 도로·물류 기관 은퇴 임직원 재능기부 멘토단",
            "youth": "🌱 [청년 유입] 드론·스마트 콜드체인 물류 IT 청년 벤처 유입",
            "global": "🌐 [글로벌] 캄보디아·태국 물류 전문 유학생 & 개도국 공공분야 연수생 매핑"
        }
    },
    "문경시": {
        "officialSiteUrl": "https://www.gbmg.go.kr",
        "news": "[보도] 문경시직장공장새마을회, 어르신 250명에 짜장면 대접…공경문화 실천",
        "newsUrl": "https://www.kyongbuk.co.kr/news/articleView.html?idxno=4076365",
        "history": "문경 도자기 및 오미자 등 지역 특산품 가공 기술을 바탕으로 아시아 지역 커뮤니티 자립 프로그램을 운영해 왔습니다.",
        "project": "☕ 웰니스 특산물 가공 & 개도국 마을기업 브랜딩 프로젝트",
        "desc": "개도국 현지 특산물의 상품성 강화 및 친환경 브랜딩 컨설팅을 지원합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 문경 5색 오미자 추출 & 전통 장인 도자기 마스터 노하우",
            "youth": "🌱 [청년 유입] 웰니스 오미자 음료 R&D & 힐링 로컬 브랜딩 청년 창업가 유입",
            "global": "🌐 [글로벌] 아시아 웰니스 문화 교류 유학생 & 현지 마을기업 매니저 매핑"
        }
    },
    "의성군": {
        "officialSiteUrl": "https://www.usc.go.kr",
        "news": "[보도] 의성군새마을회, 탄소중립 실천 3R 재활용품 경진대회 개최",
        "newsUrl": "https://www.sidae.com/article/2026071010240327731",
        "history": "이웃사촌 시범마을 등 청년 복합 농업 자립 시스템을 성공시켜 인도네시아, 라오스 등 동남아 농촌 유스(Youth) 자립 벤치마킹 대상이 되고 있습니다.",
        "project": "🌱 청년 귀농 청년창농 모델 & 스마트 자립 마을기업 프로젝트",
        "desc": "의성의 청년 자립 성공 모델을 개도국 현지 청년 지도자 교육 과정으로 이식합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 의성 마늘·스마트 딸기 시니어 농가 멘토링 & 토지 임대 협력",
            "youth": "🌱 [청년 유입] 이웃사촌 청년 창농 스마트팜 & 청년 유입 커뮤니티 리더",
            "global": "🌐 [글로벌] 인도네시아·라오스 현지 청년 농업 지도자 연수생 매핑"
        }
    },
    "성주군": {
        "officialSiteUrl": "https://www.sj.go.kr",
        "news": "[보도] 직장공장새마을운동성주군협의회, 에너지 절약 거리 캠페인 전개",
        "newsUrl": "https://www.seongjuro.co.kr/news/view.php?idx=59896",
        "history": "세계 최고의 참외 시설 재배 기술력을 갖춘 성주군은 몽골 및 중앙아시아의 추운 기후에 맞는 시설하우스 및 스마트 보온 기술을 교류하고 있습니다.",
        "project": "🍈 기후변화 대응 시설하우스 & 스마트 보온 영농 프로젝트",
        "desc": "몽골·중앙아시아의 척박한 기후 조건에 적합한 가성비 시설하우스 제어 기술을 전수합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 성주 참외 50년 시설하우스 온도·토양 제어 장인 노하우",
            "youth": "🌱 [청년 유입] 스마트 온실 자동화 팩토리 & 참외 바이오 식품 청년 창업가 유입",
            "global": "🌐 [글로벌] 몽골·중앙아시아 추운 기후 지역 초청 농업 연수생 매핑"
        }
    },
    "고령군": {
        "officialSiteUrl": "https://www.goryeong.go.kr",
        "news": "[보도] 고령군새마을회, 제16회새마을의 날 기념식과 한마음대회 개최",
        "newsUrl": "https://www.aflnews.co.kr/news/articleView.html?idxno=319851",
        "history": "대가야 역사 고도 고령군은 농업 용수 및 토양 개량 노하우를 바탕으로 스리랑카 등 아시아 자매도시 농가 자조 지원 사업을 펼쳐왔습니다.",
        "project": "🏺 토양 개량 적정기술 & 역사문화관광 연계 프로젝트",
        "desc": "스리랑카 등 도서·농촌 마을의 토양 및 자조형 협동조합 모델을 컨설팅합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 대가야 토기·토양 미생물 개량 시니어 연구자의 노하우",
            "youth": "🌱 [청년 유입] 토양 개량 미생물 벤처 & 역사 문화 관광 ICT 청년 창업가 유입",
            "global": "🌐 [글로벌] 스리랑카·남아시아 농촌 토양 개량 연수생 & 다문화 청년 매핑"
        }
    },
    "예천군": {
        "officialSiteUrl": "https://www.yecheon.go.kr",
        "news": "[보도] 예천군새마을회, '2024새마을지도자 대회 및 총회' 열어",
        "newsUrl": "https://daily.hankooki.com/news/articleView.html?idxno=1162002",
        "history": "친환경 곤충 산업 및 양궁의 본고장으로서 동남아시아 농촌 지역에 친환경 병해충 방제 및 스마트 영농 기술을 전수하고 있습니다.",
        "project": "🐝 친환경 생물학적 방제 & 스마트 유기농 프로젝트",
        "desc": "라오스·캄보디아 농가에 화학 농약에 의존하지 않는 친환경 바이오 방제 적정기술을 보급합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 예천 친환경 화분 곤충 & 유기농 쌀 시니어 농가 노하우",
            "youth": "🌱 [청년 유입] 곤충 바이오 단백질 & 친환경 생물 방제 청년 스타트업 유입",
            "global": "🌐 [글로벌] 라오스·베트남 유기농 곤충 농업 연수생 & 외국인 유학생 매핑"
        }
    },
    "봉화군": {
        "officialSiteUrl": "https://www.bonghwa.go.kr",
        "news": "[보도] 재능기부로 공동체 문화 확산하는봉화군 새마을운동",
        "newsUrl": "https://www.viva100.com/article/20260325500323",
        "history": "베트남 리왕조 후손인 봉화 화씨 역사 유적을 품은 한-베 교류의 거점이자, 청정 산림 약초 자원을 바탕으로 동남아 산림 프로젝트를 추진합니다.",
        "project": "🌲 산림 자원 양묘 & 한-베 역사문화 네트워크 프로젝트",
        "desc": "베트남 현지 및 동남아 산림 황폐화 지역에 친환경 양묘장 및 약초 자립 마을을 전수합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 봉화 청정 산송이·약초 재배 시니어 심마니 장인 노하우",
            "youth": "🌱 [청년 유입] 산림 바이오 소재 & 한-베 역사문화 관광 청년 창업가 유입",
            "global": "🌐 [글로벌] 베트남 화씨 후손 및 베트남 국가 유학생·문화 교류 인재 매핑"
        }
    },
    "울진군": {
        "officialSiteUrl": "https://www.uljin.go.kr",
        "news": "[보도] 울진군,새마을지도자와‘화합으로 새로운 희망’ 다짐",
        "newsUrl": "http://www.cfnews.kr/news.aspx/103675",
        "history": "2023년 원자력 수소 국가산업단지로 지정된 울진군은 무탄소 청정 에너지 및 대규모 해수담수화 기술을 보유한 동해안 해양 에너지 거점 도시입니다.",
        "project": "⚛️ 무탄소 청정 에너지 & 해수담수화 적정기술 매핑 프로젝트",
        "desc": "울진의 무탄소 에너지 및 해수담수화 기술을 기후변화 해수면 상승으로 식수난을 겪는 태평양 도서국 주민 자립 인프라와 연결합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 울진 원전 엔지니어 은퇴 시니어 & 해양 수산 시니어 전문 노하우",
            "youth": "🌱 [청년 유입] 해수담수화 소형 장치 & 무탄소 수소 에너지 청년 벤처 유입",
            "global": "🌐 [글로벌] 키리바시·피지 등 태평양 도서국 초청 식수 분야 청년 연수생 매핑"
        }
    },
    "울릉군": {
        "officialSiteUrl": "https://www.ulleung.go.kr",
        "news": "[보도] 울릉군새마을회, 푸른울릉가꾸기 자연 정화 봉사 전개",
        "newsUrl": "https://www.kyongbuk.co.kr/news/articleView.html?idxno=4057126",
        "history": "대한민국 동쪽 끝 독도를 수호하는 울릉군은 도서 지역 고유의 해양 수산 자원 관리 및 청정 어촌 자립 노하우를 태평양 도서국과 공유합니다.",
        "project": "🏝️ 독도 해양 생태 보존 & 도서 어촌 수산 자립 새마을 프로젝트",
        "desc": "키리바시, 피지 등 태평양 도서국 어촌 마을에 해양 수산 적정기술 및 자조형 어촌 계를 전수합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 울릉 독도 해녀·도서 어촌계 시니어 해양 수산 노하우",
            "youth": "🌱 [청년 유입] 울릉 울릉도 산채·해양 수산 웰니스 브랜딩 청년 창업가 유입",
            "global": "🌐 [글로벌] 태평양 도서국 어촌 수산 연수생 & 독도 해양 생태 외국인 서포터즈 매핑"
        }
    },
    "영양군": {
        "officialSiteUrl": "https://www.yyg.go.kr",
        "news": "[보도] 영양군새마을회, 재활용품경진대회 시상·하계수련대회 개최…지역 공동",
        "newsUrl": "http://www.metroseoul.co.kr/article/20260702500199",
        "history": "대한민국 대표 청정 지역으로서 고품질 고추 및 산산나물 유기 농법을 아시아 농촌 지역 환경 개선 및 소득증대 사업과 매핑해 왔습니다.",
        "project": "🌶️ 청정 유기 농업 & 토양 보존형 스마트 영농 프로젝트",
        "desc": "아시아 고산 지대 농가에 영양군 고유의 친환경 유기농업 기법과 농가 소득 창출을 전수합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 영양 고추 50년 유기농 생육 장인 & 산나물 자원 시니어 농가",
            "youth": "🌱 [청년 유입] 영양 고추 캡사이신 바이오 & 프리미엄 유기농 푸드 청년 창업가 유입",
            "global": "🌐 [글로벌] 아시아 고산지대 농업 연수생 & 경북 다문화 가계 네트워크 매핑"
        }
    },
    "영덕군": {
        "officialSiteUrl": "https://www.yd.go.kr",
        "news": "[보도] 영덕군새마을회, 희망2025 나눔 캠페인 성금 기탁",
        "newsUrl": "http://www.metroseoul.co.kr/article/20241223500237",
        "history": "동해안 최대 풍력발전 단지와 해양 생태계를 갖춘 영덕군은 해양 탄소 흡수원(블루카본) 보존 및 신재생 에너지 기술 프로젝트를 연계합니다.",
        "project": "💨 신재생 에코 에너지 & 블루카본 해양 생태 프로젝트",
        "desc": "동남아 연안 마을의 맹그로브 보존 및 소형 신재생 에너지 시설 구축을 컨설팅합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 영덕 대게·해양 수산 및 신재생 단지 은퇴 전문 시니어",
            "youth": "🌱 [청년 유입] 소형 풍력/태양광 적정기술 & 블루카본 해양 에코 청년 스타트업 유입",
            "global": "🌐 [글로벌] 동남아 연안국 해양 환경 연수생 & 신재생 에너지 유학생 매핑"
        }
    },
    "청송군": {
        "officialSiteUrl": "https://www.cs.go.kr",
        "news": "[보도] 청송군새마을회, 2026년 숨은자원모으기 경진대회 실시",
        "newsUrl": "https://www.dkilbo.com/news/articleView.html?idxno=548853",
        "history": "유네스코 세계지질공원이자 명품 사과 생산지로서 다기능 스마트 과수원 및 기후변화 적응 농법을 아시아 지자체와 교류하고 있습니다.",
        "project": "🍎 스마트 과수원 관리 & 기후변화 적응 농업 프로젝트",
        "desc": "아시아 기후변화 위험 농가에 청송의 스마트 과수 병해충 예찰 및 영농 기술을 전달합니다.",
        "matching3Axis": {
            "senior": "👴 [시니어] 청송 명품 사과 40년 과수 적정 전정·수형 시니어 대가",
            "youth": "🌱 [청년 유입] AI 사과 병해충 예찰 카메라 & 스마트 과수원 챗봇 청년 벤처 유입",
            "global": "🌐 [글로벌] Central Asia/동남아 과수 기후변화 대응 초청 연수생 매핑"
        }
    }
},

  gaokFullData: {
  "경상북도 본청": [
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "호주",
      "city": "웨스턴오스트레일리아주( Western Australia State )",
      "date": "2007-10-07",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "미국",
      "city": "오하이오주( The State of Ohio )",
      "date": "1984-12-05",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "몽골",
      "city": "울란바타르시( Ulaanbaatar City )",
      "date": "2007-04-22",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "베트남",
      "city": "까마우성( Ca Mau Province )",
      "date": "2017-12-22",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "베트남",
      "city": "박닌성( Bac Ninh Provinc )",
      "date": "2025-12-03",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "베트남",
      "city": "타이응우옌성( Thai Nguyen Province )",
      "date": "2005-02-21",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "베트남",
      "city": "호치민시( Ho Chi Minh City )",
      "date": "2017-12-03",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "인도네시아",
      "city": "서자바주( West Java Province )",
      "date": "2018-05-06",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "인도네시아",
      "city": "족자카르타주( Yogyakarta Province )",
      "date": "2005-02-24",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "일본",
      "city": "히로시마현( Hiroshima )",
      "date": "2025-11-13",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "중국",
      "city": "닝샤후이족자치구 ( Ningxia Hui Autonomous Region )",
      "date": "2021-10-21",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "중국",
      "city": "랴오닝성( Liaoning Province )",
      "date": "2024-04-15",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "중국",
      "city": "산시성( Shaanxi Province )",
      "date": "2013-04-05",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "중국",
      "city": "지린성( Jilin Province )",
      "date": "2015-08-30",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "중국",
      "city": "허난성(  Henan Province )",
      "date": "1995-10-23",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "중국",
      "city": "후난성( Hunan Province )",
      "date": "2018-11-29",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "캄보디아",
      "city": "캄퐁통주( Kampong )",
      "date": "2024-07-27",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "태국",
      "city": "아유타야주( Ayutthaya )",
      "date": "2025-05-06",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "필리핀",
      "city": "북수리가오주( Surigao del Norte )",
      "date": "2018-01-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "남아프리카공화국",
      "city": "노스웨스트주( Northwest Province )",
      "date": "1998-09-16",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "그리스",
      "city": "아티카 지방 아테네시( Athens City, Attica Region )",
      "date": "1999-04-30",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "러시아",
      "city": "연해주(프리모르스키 지방)( Primorsky Krai )",
      "date": "2018-11-08",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "러시아",
      "city": "이르쿠츠크주( Irkutsk Oblast )",
      "date": "1996-09-10",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "스페인",
      "city": "카스티야이레온주( Castile and Leon Autonomous Community )",
      "date": "2005-11-08",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "우즈베키스탄",
      "city": "타슈켄트주( Tashkent Region )",
      "date": "2013-08-01",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "카자흐스탄",
      "city": "동카자흐스탄주( East Kazakhstan Region )",
      "date": "2008-08-23",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "튀르키예",
      "city": "부르사주( Bursa Province )",
      "date": "2001-09-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "튀르키예",
      "city": "이스탄불주( Istanbul Province )",
      "date": "1999-04-29",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "튀르키예",
      "city": "이스탄불주 이스탄불시( Istanbul City, Istanbul Province )",
      "date": "2010-12-02",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "폴란드",
      "city": "마조비아주( Mazovia Province )",
      "date": "2009-05-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "프랑스",
      "city": "아키텐주( Aquitaine Region )",
      "date": "2011-12-09",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 본청",
      "muni": "경상북도 본청",
      "country": "프랑스",
      "city": "알자스주( Alsace Region )",
      "date": "1999-04-27",
      "type": "자매교류"
    }
  ],
  "포항시": [
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "뉴질랜드",
      "city": "오클랜드지방 오클랜드시( Auckland City, Auckland Region )",
      "date": "2008-08-04",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "미국",
      "city": "조지아주 귀넷카운티( Gwinnett County, Georgia State )",
      "date": "2009-07-01",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "미국",
      "city": "캘리포니아주 피츠버그시( Pittsburg City, California State )",
      "date": "1987-07-24",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "몽골",
      "city": "다르항올아이막( Darkhan-Uul Aimag )",
      "date": "2010-11-29",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "베트남",
      "city": "바리아붕따우성( Ba Ria-Vung Tau Province )",
      "date": "2011-11-01",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "일본",
      "city": "교토부( Kyoto Prefecture )",
      "date": "2011-07-26",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "일본",
      "city": "교토부 마이즈루시( Maizuru City, Kyoto Prefecture )",
      "date": "2011-07-26",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "일본",
      "city": "니가타현 조에쓰시( Joetsu City, Niigata Prefecture )",
      "date": "1996-04-29",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "일본",
      "city": "히로시마현 후쿠야마시( Fukuyama City, Hiroshima Prefecture )",
      "date": "1979-01-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "광둥성 잔장시( zhanjiang City, Guangdong Province )",
      "date": "2011-05-30",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "광시좡족자치구 베이하이시( Beihai City,Guangxi Zhuang Autonomous Region )",
      "date": "2008-11-25",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "깐수성 란조우시( Lanzhou City, Gansu Province )",
      "date": "2015-07-10",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "네이멍구자치구 바오터우시( Baotou City, inner mongolia Autonomous Region )",
      "date": "2009-11-20",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "랴오닝성 다롄시( Dalian City, Liaoning Province )",
      "date": "2008-09-29",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "산둥성 라이우시( Laiwu City, Shandong Province )",
      "date": "2012-11-13",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "산둥성 르자오시 ( Rizhao City, Shandong Province )",
      "date": "2008-09-25",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "산둥성 지난시( Jinan City, Shandong Province )",
      "date": "2020-09-29",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "산둥성 칭다오시 핑두시( Pingdu City, Qingdao City, Shandong Province )",
      "date": "2015-09-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "윈난성 쿤밍시( Kunming City, Yunnan Province )",
      "date": "2008-11-26",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "장쑤성 쑤저우시 장자강시( Zhangjiagang City, Suzhou City, Jiangsu Province )",
      "date": "2009-07-26",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "지린성  옌볜조선족자치주 훈춘시( Hunchun City, Yanbian Korean Autonomous Prefecture, Jilin Province )",
      "date": "1995-05-15",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "지린성 옌볜조선족자치주 투먼시( Tumen City, Yanbian Korean Autonomous Prefecture, Jilin Province  )",
      "date": "2018-09-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "지린성 창춘시( Changchun City, Jilin Province )",
      "date": "2010-08-26",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "허베이성 탕산시( Tangshan City, Hebei Province )",
      "date": "2008-07-18",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "중국",
      "city": "후베이성 징먼시( Jingmen City, Hubei Province )",
      "date": "2019-10-31",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "필리핀",
      "city": "카비테주( Cavite Province )",
      "date": "2011-11-04",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "독일",
      "city": "작센주 드레스덴시( Dresden City, Saxony State )",
      "date": "2016-08-29",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "러시아",
      "city": "스베르들롭스크주 예카테린부르크시( Yekaterinburg City, Sverdlovsk Oblast )",
      "date": "2007-07-12",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "러시아",
      "city": "연해주(프리모르스키 지방)( Primorsky Krai )",
      "date": "2008-10-09",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "러시아",
      "city": "연해주(프리모르스키 지방) 블라디보스토크시( Vladivostok City, Primorsky Krai )",
      "date": "2018-11-09",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "러시아",
      "city": "페트로파블롭스크 캄차츠키시( Petropavlovsk Kamchatski City, Kamchatka Oblast )",
      "date": "2019-02-22",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "러시아",
      "city": "하산스키군 하산시( Khasan City, Khasansky District )",
      "date": "2014-02-24",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "키르키스스탄",
      "city": "추이주 비슈케크시( Bishkek City, Chuy Region )",
      "date": "2009-03-03",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "튀르키예",
      "city": "이스탄불시 베이을루구( Beyoglu District, Istanbul )",
      "date": "2024-11-17",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "튀르키예",
      "city": "코자엘리주 이즈미트시( Izmit City, Kacaeli Province )",
      "date": "2013-09-09",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 포항시",
      "muni": "포항시",
      "country": "헝가리",
      "city": "데브레첸( Debrecen )",
      "date": "2025-11-28",
      "type": "우호교류"
    }
  ],
  "구미시": [
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "멕시코",
      "city": "바하칼리포르니아주 메히칼리시( Mexicali City, Baja California State )",
      "date": "1998-11-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "미국",
      "city": "텍사스주 휴스턴시( Houston City, Texas State )",
      "date": "2008-11-03",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "대만",
      "city": "타오위안시( Taoyuan City )",
      "date": "2016-09-07",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "대만",
      "city": "타오위안시 쭝리구( Zhongli District )",
      "date": "1989-11-06",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "베트남",
      "city": "박닌성 박닌시( Bac Ninh )",
      "date": "2022-10-19",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "일본",
      "city": "시가현 오츠시( Otsu City, Shiga Prefecture )",
      "date": "1990-04-12",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "중국",
      "city": "랴오닝성 선양시( Shenyang City, Liaoning Province )",
      "date": "1997-06-23",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "중국",
      "city": "산시성 웨이난시( Weinan City, ShaanXi Province )",
      "date": "2014-11-17",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "중국",
      "city": "쓰촨성 광안시 ( guang-an City, Sichuan Province   )",
      "date": "2012-08-13",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "중국",
      "city": "후난성 창사시( Changsha City, Hunan Province )",
      "date": "1998-10-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "네덜란드",
      "city": "북브라반트주 에인트호번시( Eindhoven City, North Brabant Province  )",
      "date": "2003-11-07",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "독일",
      "city": "볼프스부르크(  Wolfsburg )",
      "date": "2023-02-24",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "영국",
      "city": "맨체스터( Manchester )",
      "date": "2019-11-05",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "키르키스스탄",
      "city": "추이주 비슈케크시( Bishkek City, Chuy Region )",
      "date": "1991-08-14",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 구미시",
      "muni": "구미시",
      "country": "프랑스",
      "city": "그르노블 알프스 메트로폴( Grenoble Alpes Metropole )",
      "date": "2023-03-03",
      "type": "우호교류"
    }
  ],
  "경주시": [
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "이란",
      "city": "이스파한주 이스파한시( Isfahan City, Isfahan Province )",
      "date": "2013-08-20",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "이집트",
      "city": "룩소르주 룩소르시(  Luxor City, Luxor Governorate )",
      "date": "2019-03-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "페루",
      "city": "아레키파주 아레키파시( Arequipa City, Arequipa Region )",
      "date": "2015-11-05",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "베트남",
      "city": "트어티엔후에성 후에시( Hue City, Thua Thien-Hue Province  )",
      "date": "2007-09-07",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "일본",
      "city": "나라현 나라시( Nara City, Nara Prefecture )",
      "date": "1970-04-15",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "일본",
      "city": "도치기현 닛코시( Nikko City, Tochigi Prefecture )",
      "date": "2009-11-11",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "일본",
      "city": "오이타현 우사시( Usa City, Oita Prefecture )",
      "date": "1992-07-03",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "일본",
      "city": "후쿠이현 오바마시( Obama City, Fukui Prefecture )",
      "date": "1977-02-13",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "간쑤성 주취안시 둔황시( Dunhuang City，Jiuquan City, Gansu Province )",
      "date": "2025-11-18",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "산시성 시안시( Xi'an City, Shaanxi Province )",
      "date": "1994-11-18",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "안후이성 츠저우시( Chizhou City, Anhui Province )",
      "date": "2023-09-21",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "장쑤성 양저우시( Yangzhou City, Jiangsu Province )",
      "date": "2008-11-24",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "푸젠성 난핑시( Fujian Province, Nanping city )",
      "date": "2021-07-13",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "허난성 자오쭤시( Jiaozuo City, Henan Province )",
      "date": "2012-11-05",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "허베이성 청더시( Chengde City, Hebei Province )",
      "date": "2015-10-20",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "후난성 장자제시( Zhangjiajie city, Hunan Province )",
      "date": "2024-10-23",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "중국",
      "city": "후베이성 이창시( Yichang City, Hubei Province  )",
      "date": "2013-10-16",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "슬로바키아",
      "city": "니트라주 니트라시( Nitra City, Nitra Region )",
      "date": "2014-08-21",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "아제르바이잔",
      "city": "가발라주 가발라시( Gabala City, Gabala Region )",
      "date": "2017-03-15",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "우즈베키스탄",
      "city": "사마르칸트주 사마르칸트시( Samarkand City, Samarkand Region )",
      "date": "2013-08-02",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "이탈리아",
      "city": "캄파니아주 폼페이시( Pompeii City, Campania Region )",
      "date": "1985-10-14",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "체코",
      "city": "비소치나주 트르제비치시( Třebíč )",
      "date": "2023-08-18",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경주시",
      "muni": "경주시",
      "country": "프랑스",
      "city": "일드프랑스주 이블린주 베르사이유시( Versailles City, Yvelines Department,Ile-de-France Region )",
      "date": "1987-04-15",
      "type": "자매교류"
    }
  ],
  "김천시": [
    {
      "muni_raw": "경상북도 김천시",
      "muni": "김천시",
      "country": "인도네시아",
      "city": "서자바주 수방시( Subang Regency, West Java Province )",
      "date": "2017-10-12",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 김천시",
      "muni": "김천시",
      "country": "일본",
      "city": "이시카와현 나나오시( Nanao City, Ishikawa Prefecture )",
      "date": "1975-10-16",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 김천시",
      "muni": "김천시",
      "country": "중국",
      "city": "랴오닝성 푸순시( Fushun City, Liaoning Province )",
      "date": "2006-09-24",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 김천시",
      "muni": "김천시",
      "country": "중국",
      "city": "쓰촨성 청두시( Chengdu City, Sichuan Province )",
      "date": "2000-11-07",
      "type": "자매교류"
    }
  ],
  "안동시": [
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "이스라엘",
      "city": "텔아비브주 홀론시( Holon City, Tel Aviv District )",
      "date": "2004-02-08",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "페루",
      "city": "쿠스코주 쿠스코시( Cusco City, Cusco Region )",
      "date": "2009-09-07",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "일본",
      "city": "가나가와현 가마쿠라시( Kamakura City, Kanagawa Prefecture )",
      "date": "2013-07-23",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "일본",
      "city": "기후현 다카야마시( Takayama )",
      "date": "2022-05-30",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "일본",
      "city": "야마가타현 사가에시( Sagae City, Yamagata Prefecture )",
      "date": "1974-02-04",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "중국",
      "city": "산둥성 지난시( Jinan City, Shandong Province )",
      "date": "2014-12-10",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "중국",
      "city": "산둥성 지닝시 취푸시( Qufu City, Jining City, Shandong Province )",
      "date": "2001-10-06",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "중국",
      "city": "산시성 시안시( Xi'an City, Shaanxi Province )",
      "date": "2020-11-30",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "중국",
      "city": "허난성 핑딩산시( Pingdingshan City, Henan Province )",
      "date": "2000-05-10",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "필리핀",
      "city": "다구판( Dagupan )",
      "date": "2025-11-05",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "그리스",
      "city": "펠로폰네소스 지방 코린토스시 ( Corinth City, Peloponnese Region )",
      "date": "2024-11-02",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "루마니아",
      "city": "알바이울리아( Alba Iulia )",
      "date": "2025-11-08",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "아제르바이잔",
      "city": "슈샤( Shusha )",
      "date": "2022-11-17",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 안동시",
      "muni": "안동시",
      "country": "이탈리아",
      "city": "아스티( Asti )",
      "date": "2024-11-02",
      "type": "우호교류"
    }
  ],
  "영주시": [
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "대만",
      "city": "난터우현 난터우시( Nantou City, Nantou County )",
      "date": "2004-05-07",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "대만",
      "city": "난터우현 차우툰진( Caotun Township, Nantou County )",
      "date": "2004-11-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "일본",
      "city": "시즈오카현 후지노미야시( Fujinomiya City, Shizuoka Prefecture )",
      "date": "2012-11-05",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "중국",
      "city": "광둥성 사오관시( Shaoguan City, Guangdong Province )",
      "date": "2010-04-26",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "중국",
      "city": "산둥성 지닝시( Jining City, Shandong Province )",
      "date": "2010-09-27",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "중국",
      "city": "안후이성 보저우시( Bozhou City, Anhui Province )",
      "date": "2003-10-02",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 영주시",
      "muni": "영주시",
      "country": "중국",
      "city": "허난성 자오쭤시( Jiaozuo City, Henan Province )",
      "date": "2012-11-05",
      "type": "우호교류"
    }
  ],
  "영천시": [
    {
      "muni_raw": "경상북도 영천시",
      "muni": "영천시",
      "country": "미국",
      "city": "뉴욕주 버팔로시( Buffalo, New York )",
      "date": "2011-11-03",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 영천시",
      "muni": "영천시",
      "country": "일본",
      "city": "아오모리현 구로이시시( Kuroishi City, Aomori Prefecture )",
      "date": "1984-08-17",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 영천시",
      "muni": "영천시",
      "country": "중국",
      "city": "허난성 카이펑시( Kaifeng City, Henan Province )",
      "date": "2005-06-15",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 영천시",
      "muni": "영천시",
      "country": "중국",
      "city": "허베이성 바오딩시 안궈시( Anguo City, Baoding City, Hebei Province )",
      "date": "2011-09-30",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 영천시",
      "muni": "영천시",
      "country": "중국",
      "city": "허베이성 황화시( Huang Hua, Hebei  )",
      "date": "2019-12-11",
      "type": "우호교류"
    }
  ],
  "상주시": [
    {
      "muni_raw": "경상북도 상주시",
      "muni": "상주시",
      "country": "미국",
      "city": "캘리포니아주 데이비스시( Davis City, California State )",
      "date": "2004-06-15",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 상주시",
      "muni": "상주시",
      "country": "대만",
      "city": "지룽시( Keelung city )",
      "date": "2013-08-26",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 상주시",
      "muni": "상주시",
      "country": "중국",
      "city": "강서성 의춘시( Yichun City, Jiangxi Province )",
      "date": "2005-11-02",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 상주시",
      "muni": "상주시",
      "country": "중국",
      "city": "장시성 이춘시( Yichun City, Jiangxi Province )",
      "date": "2005-11-02",
      "type": "자매교류"
    }
  ],
  "경산시": [
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "일본",
      "city": "교토부 조요시( Zyoyo City, Kyoto Prefecture )",
      "date": "1991-01-22",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "중국",
      "city": "네이멍구 후룬베이얼시 자란툰시( Zhalantun City, Hulunbeier City, inner mongolia Autonomous Region )",
      "date": "2005-01-07",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "중국",
      "city": "닝샤후이족자치구 인촨시( Yinchuan City, Ningxia Hui Autonomous Region )",
      "date": "2007-12-20",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "중국",
      "city": "저장성 사오싱시 성저우시( Shengzhou City, Shaoxing City, Zhejiang Province )",
      "date": "2000-03-07",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "중국",
      "city": "저장성 항저우시( Hangzhou City, Zhejiang Province )",
      "date": "2001-10-30",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "중국",
      "city": "칭다오시 서해안신구( West Coast New Area, Qingdao City )",
      "date": "1996-06-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 경산시",
      "muni": "경산시",
      "country": "우즈베키스탄",
      "city": "나망간주 나망간시( Namangan City, Namangan Region )",
      "date": "2023-11-30",
      "type": "우호교류"
    }
  ],
  "칠곡군": [
    {
      "muni_raw": "경상북도 칠곡군",
      "muni": "칠곡군",
      "country": "베트남",
      "city": "타이응우옌성( Thai Nguyen Province )",
      "date": "2023-06-26",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 칠곡군",
      "muni": "칠곡군",
      "country": "중국",
      "city": "허난성 지위안시( Jiyuan City, Henan Privince )",
      "date": "2015-04-21",
      "type": "자매교류"
    }
  ],
  "문경시": [
    {
      "muni_raw": "경상북도 문경시",
      "muni": "문경시",
      "country": "베트남",
      "city": "라이쩌우성( Lai Chau Province )",
      "date": "2022-12-23",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 문경시",
      "muni": "문경시",
      "country": "베트남",
      "city": "타이응우옌성 송콩시 ( Song Cong City  )",
      "date": "2019-09-06",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 문경시",
      "muni": "문경시",
      "country": "중국",
      "city": "장쑤성 우시시 이싱시( Yixing City, Wuxi City, Jiangsu Province )",
      "date": "2008-10-18",
      "type": "자매교류"
    }
  ],
  "의성군": [
    {
      "muni_raw": "경상북도 의성군",
      "muni": "의성군",
      "country": "몽골",
      "city": "셀링게아이막 만달군( Mandal Sum, Selenge Aimag )",
      "date": "2008-02-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 의성군",
      "muni": "의성군",
      "country": "중국",
      "city": "산시성 셴양시( Xianyang City, Shaanxi Province )",
      "date": "2003-10-17",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 의성군",
      "muni": "의성군",
      "country": "스위스",
      "city": "하우프트빌 고트하우스( Gemeinde Hauptwi- Gottshaus )",
      "date": "2024-06-04",
      "type": "우호교류"
    }
  ],
  "청송군": [
    {
      "muni_raw": "경상북도 청송군",
      "muni": "청송군",
      "country": "중국",
      "city": "장쑤성 쑤저우시 타이창시( Taicang City, Suzhou City, Jiangsu Province )",
      "date": "2015-10-20",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 청송군",
      "muni": "청송군",
      "country": "중국",
      "city": "장쑤성 쑤첸시( Suqian City, Jiangsu Province )",
      "date": "2005-11-26",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 청송군",
      "muni": "청송군",
      "country": "중국",
      "city": "허난성 정저우시 관청후이족구( GuanchengHui District, Zhengzhou City, Henan Province )",
      "date": "2016-01-20",
      "type": "자매교류"
    }
  ],
  "영양군": [
    {
      "muni_raw": "경상북도 영양군",
      "muni": "영양군",
      "country": "베트남",
      "city": "다낭시 화방군( Hoa Vang District, Da Nang City )",
      "date": "2018-03-07",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 영양군",
      "muni": "영양군",
      "country": "중국",
      "city": "허난성 주마뎬시 루난현( Runan county, Zhumadian City, Henan Province )",
      "date": "2016-03-25",
      "type": "자매교류"
    }
  ],
  "영덕군": [
    {
      "muni_raw": "경상북도 영덕군",
      "muni": "영덕군",
      "country": "미국",
      "city": "북마리아나군도 사이판시( Saipan City, Northern Mariana Islands )",
      "date": "1994-07-19",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 영덕군",
      "muni": "영덕군",
      "country": "일본",
      "city": "후쿠이현 에치젠정( Echizen Town, Fukui Prefecture )",
      "date": "2002-11-09",
      "type": "자매교류"
    }
  ],
  "청도군": [
    {
      "muni_raw": "경상북도 청도군",
      "muni": "청도군",
      "country": "일본",
      "city": "가고시마현 도쿠노시마 3개정( Tokunoshima, Kagoshima Prefecture )",
      "date": "2003-03-14",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 청도군",
      "muni": "청도군",
      "country": "중국",
      "city": "헤이룽장성  헤이허시 넌장현( Nenjiang County, Heihe City, Heilongjiang Province )",
      "date": "1999-12-24",
      "type": "자매교류"
    }
  ],
  "고령군": [
    {
      "muni_raw": "경상북도 고령군",
      "muni": "고령군",
      "country": "미국",
      "city": "메릴랜드주 몽고메리카운티( Montgomery County, Maryland State )",
      "date": "2015-01-21",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 고령군",
      "muni": "고령군",
      "country": "중국",
      "city": "산둥성 쯔보시 린쯔구( Linzi District, Zibo City, Shandong Province )",
      "date": "2016-06-26",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 고령군",
      "muni": "고령군",
      "country": "중국",
      "city": "안후이성 마안산시( Maanshan City, Anhui Province )",
      "date": "2017-08-28",
      "type": "우호교류"
    },
    {
      "muni_raw": "경상북도 고령군",
      "muni": "고령군",
      "country": "이탈리아",
      "city": "롬바르디주 크레모나시( Cremona City, Lombardy Region )",
      "date": "2014-11-10",
      "type": "우호교류"
    }
  ],
  "예천군": [
    {
      "muni_raw": "경상북도 예천군",
      "muni": "예천군",
      "country": "베트남",
      "city": "옌바이성 옌빈현( Yen Binh District, Yen Bai Province )",
      "date": "2015-02-26",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 예천군",
      "muni": "예천군",
      "country": "중국",
      "city": "산시성 바오지시( Baoji City,  Shaanxi Province   )",
      "date": "2016-05-26",
      "type": "자매교류"
    }
  ],
  "봉화군": [
    {
      "muni_raw": "경상북도 봉화군",
      "muni": "봉화군",
      "country": "몽골",
      "city": "셀렝게아이막( Selenge Aimag )",
      "date": "2008-07-08",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 봉화군",
      "muni": "봉화군",
      "country": "베트남",
      "city": "박닌성 뜨선시 ( Tu Son )",
      "date": "2023-09-22",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 봉화군",
      "muni": "봉화군",
      "country": "중국",
      "city": "산시성 통촨시( Tongchuan City, Shaanxi Province )",
      "date": "1997-06-20",
      "type": "자매교류"
    },
    {
      "muni_raw": "경상북도 봉화군",
      "muni": "봉화군",
      "country": "중국",
      "city": "저장성 닝보시 펑화시( Fenghua City, Ningbo City, Zhejiang Province )",
      "date": "2014-11-12",
      "type": "우호교류"
    }
  ],
  "울진군": [
    {
      "muni_raw": "경상북도 울진군",
      "muni": "울진군",
      "country": "일본",
      "city": "시즈오카현 오마에자키시( Omaezaki City, Shizuoka Prefecture  )",
      "date": "2009-08-04",
      "type": "자매교류"
    }
  ],
  "울릉군": [
    {
      "muni_raw": "경상북도 울릉군",
      "muni": "울릉군",
      "country": "미국",
      "city": "텍사스주 그랜드프레리시 ( Grand Prairie )",
      "date": "2017-04-25",
      "type": "우호교류"
    }
  ]
}
};