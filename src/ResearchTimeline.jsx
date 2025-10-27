import React, { useState, useEffect, useMemo, useRef } from 'react';

/* ============== 自适应圆角 Tooltip（不会截字，不会挡鼠标） ============== */
function SvgTooltip({ x, y, text, maxWidth, padding = 10, radius = 10 }) {
  const textRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setSize({ w: bbox.width, h: bbox.height });
    }
  }, [text]);

  const bgW = Math.ceil(size.w + padding * 2);
  const bgH = Math.ceil(size.h + padding * 2);

  // 默认在点上方 14px，左右做边界修正
  let bgX = x - bgW / 2;
  let bgY = y - (bgH + 14);
  if (typeof maxWidth === 'number') {
    const minX = 8;
    const maxX = maxWidth - bgW - 8;
    bgX = Math.min(Math.max(bgX, minX), maxX);
  }

  const textX = bgX + padding;
  const textY = bgY + padding + size.h * 0.8;

  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={bgX} y={bgY} width={bgW} height={bgH} rx={radius} ry={radius} fill="#000" opacity="0.85" />
      <text ref={textRef} x={textX} y={textY} fontSize="13" fill="#fff" fontWeight="600">
        {text}
      </text>
    </g>
  );
}

/* -------------------------- 数据 -------------------------- */
const projects = [
  { id: 1,  hero: "/hero/1.webp",  title: "AI in Health", time: "2025.09 – Present", year: 2025, month: 9,  method: 0.3, theme: "Ethics",          color: "#FF6B35", size: "medium",
    summary: "How do AI systems in health (diagnostic or predictive tools) handle social data and what ethical issues arise?",
    data: "Early-stage dataset: product descriptions, user reviews, online discussions, and media coverage of health-related AI products",
    methodDetail: "Policy and document analysis focusing on fairness, transparency, and accountability in health AI models",
    outcome: "Draft (Target: CHI 2027)", lab: "Georgia Tech", supervisor: "Shaowen Bardzell",
    significance: "Examines the intersection of AI, health, and data justice, contributing to ethical frameworks for AI-driven healthcare" },
  { id: 2,  hero: "/hero/2.webp",  title: "Rainbow School: Virtual Queer Utopian School", time: "2025.09 – Present", year: 2025, month: 9, method: -0.8, theme: "Mental Health", color: "#8B7FD6", size: "medium",
    summary: "How can a metaverse space co-designed with LGBTQ+ youth embody feminist utopian values and support community well-being?",
    data: "Interviews, fieldnotes, and event records from ~20 participants across 15 virtual rooms",
    methodDetail: "Thematic analysis combined with digital ethnography to understand how virtual spaces can foster belonging and resilience",
    outcome: "Draft (Target: CHI 2027)", lab: "Georgia Tech", supervisor: "Shaowen Bardzell",
    significance: "Explores how co-design with marginalized youth can create affirming digital environments for mental health support" },
  { id: 3,  hero: "/hero/3.webp",  title: "From Source to Action: Machine Heuristics in AI-Mediated Advice", time: "2025.08 – Present", year: 2025, month: 8, method: 0.9, theme: "AI Cognition", color: "#FF85A2", size: "medium",
    summary: "How does perceived AI agency affect users' trust and behavioral intention when receiving AI-mediated advice?",
    data: "2×2 factorial experiment with approximately 200 participants",
    methodDetail: "Controlled experiment with ANOVA to test the mediating role of machine heuristics on decision-making",
    outcome: "Draft (Target: AAAI 2027)",
    significance: "Addresses critical questions about human-AI trust and the cognitive mechanisms underlying AI acceptance" },
  { id: 4,  hero: "/hero/4.webp",  title: "Women's Yoga Body Image on Xiaohongshu", time: "2024.12 – Present", year: 2024, month: 12, method: 0.1, theme: "Social Media", color: "#37D5D6", size: "large",
    summary: "How are women's bodies represented in yoga-related content on Xiaohongshu, and what implications does this have for body image?",
    data: "1,000+ posts with 3586 images from #yoga, #yoga life and #yoga girl hashtags on Xiaohongshu",
    methodDetail: "Feminist-informed content analysis with descriptive statistics to examine representation patterns",
    outcome: "Draft (Target: Body Image journal)",
    significance: "Contributes to understanding how social media platforms shape body image discourses in non-Western contexts" },
  { id: 5,  hero: "/hero/5.webp",  title: "TikTok Refugees on Xiaohongshu", time: "2025.03 – 2025.07", year: 2025, month: 3, method: -0.4, theme: "Social Media", color: "#37D5D6", size: "large",
    summary: "How did TikTok users reconstruct identity and community after migrating to Xiaohongshu following platform restrictions?",
    data: "586 user comments from cross-cultural discussion threads",
    methodDetail: "Discourse analysis examining identity negotiation, community formation, and cultural adaptation strategies",
    outcome: "Accepted at 60th Anniversary Graduate Student Conference, School of Journalism and Communication, The Chinese University of Hong Kong + arXiv preprint (arXiv:2507.14465)",
    significance: "Reveals how digital migration reshapes user identity and highlights platform governance implications" },
  { id: 6,  hero: "/hero/6.webp",  title: "Technology Acceptance of EHR in China", time: "2024.04 – 2025.02", year: 2024, month: 4, method: 0.8, theme: "Health Technology", color: "#4FB8FF", size: "large",
    summary: "What factors affect user acceptance of electronic health records (EHR) among healthcare professionals and patients in China?",
    data: "Online survey with 883 valid responses from healthcare stakeholders",
    methodDetail: "Survey analysis using the UTAUT3 model to identify key determinants of technology acceptance",
    outcome: "In Submission at IISE Transactions on Healthcare Systems Engineering",
    significance: "Provides evidence-based recommendations for EHR implementation in healthcare systems" },
  { id: 7,  hero: "/hero/7.webp",  title: "Impact of Video Pace, Ad Relevance, and Color on Attention", time: "2024.01 – 2024.06", year: 2024, month: 1, method: 0.9, theme: "Advertising", color: "#FFB84D", size: "large",
    summary: "How do video pace, ad relevance, and color characteristics influence viewers' attention and memory in digital advertising?",
    data: "Eye-tracking study with 528 observations across varied video stimuli",
    methodDetail: "Controlled experiment with statistical analysis to measure attention patterns and recall performance",
    outcome: "Dissertation",
    significance: "Advances understanding of cognitive processing in digital media and informs evidence-based ad design" },
  { id: 8,  hero: "/hero/8.webp",  title: "AR Filter Virtuality and Interaction on TikTok", time: "2023.06 – 2023.09", year: 2023, month: 6, method: 0.6, theme: "Social Media", color: "#37D5D6", size: "medium",
    summary: "How do varying levels of AR filter virtuality (exaggerated vs. realistic) affect user engagement and interaction patterns?",
    data: "823 TikTok videos across 83 different filter types",
    methodDetail: "Content analysis combined with correlation analysis to examine engagement metrics",
    outcome: "In Submission at Computers in Human Behavior",
    significance: "Explores how AR technology shapes self-presentation and social interaction in short-form video platforms" },
  { id: 9,  hero: "/hero/9.webp",  title: "Red Image 'Source Code': Nationalist Films", time: "2022.11 – 2023.09", year: 2022, month: 11, method: 0.5, theme: "Film", color: "#E31B23", size: "large",
    summary: "How do visual 'red symbols' in nationalist films influence viewers' perception and emotional connection to national identity?",
    data: "Approximately 2000 minutes of film footage combined with eye-tracking data and audience surveys",
    methodDetail: "Computational visual analysis integrated with eye-tracking and survey methods to measure cognitive and emotional responses",
    outcome: "1st Prize, Sichuan University Academic Competition",
    significance: "Bridges computational methods and cultural studies to understand visual rhetoric in media" },
  { id: 10, hero: "/hero/10.webp", title: "Mobile App Privacy Policies in China", time: "2022.11 – 2022.09", year: 2022, month: 11, method: 0.7, theme: "Policy", color: "#A8E6CF", size: "medium",
    summary: "How transparent are the privacy policies of top mobile applications in China, and what are the implications for user data protection?",
    data: "Privacy policy texts from 15 high-download mobile applications",
    methodDetail: "Text coding and policy analysis to assess transparency, comprehensibility, and compliance",
    outcome: "Published at Yangtze River Delta Graduate Student Academic Forum, Hangzhou",
    significance: "Highlights gaps in privacy governance and informs policy recommendations for digital platforms" },
  { id: 11, hero: "/hero/11.webp", title: "Fertility Dilemma in China", time: "2022.07 – 2022.09", year: 2022, month: 7, method: 0.2, theme: "Policy", color: "#A8E6CF", size: "medium",
    summary: "What factors contribute to fertility decline in China, and what policy interventions could address demographic challenges?",
    data: "Provincial-level statistical data combined with interviews from 4 family types",
    methodDetail: "Mixed-method analysis integrating quantitative demographic data with qualitative family narratives, presented through data visualization",
    outcome: "Published at China Data Journalism Competition, 2022",
    significance: "Offers data-driven insights into demographic policy and family decision-making" },
  { id: 12, hero: "/hero/12.webp", title: "FDHs' Resilience in Hong Kong", time: "2024.10 – 2025.04", year: 2024, month: 10, method: -0.7, theme: "Mental Health", color: "#8B7FD6", size: "medium",
    summary: "How did foreign domestic helpers (FDHs) in Hong Kong use digital tools to build resilience and maintain mental well-being during COVID-19?",
    data: "4 independent in-depth interviews with domestic workers",
    methodDetail: "Interview-based qualitative research with thematic analysis to identify coping strategies and resilience factors",
    outcome: "Published online as State of the World Report 2025 (CUHK) – https://digitalnarratives.com.cuhk.edu.hk/articles/state-of-the-world-2025",
    significance: "Amplifies marginalized voices and reveals how digital connectivity supports mental health in vulnerable populations" },
  { id: 13, hero: "/hero/13.webp", title: "Remember Me: Digital Memory Service for Older Adults", time: "2024.09 – 2024.12", year: 2024, month: 9, method: 0.3, theme: "Mental Health", color: "#8B7FD6", size: "small",
    summary: "How can narrative therapy and digital storytelling enhance self-identity and mental well-being among older adults living alone in Hong Kong?",
    data: "30–50 participants planned for pilot study",
    methodDetail: "Mixed-method design with repeated-measures experimental approach integrating narrative therapy and digital storytelling interventions",
    outcome: "Research Proposal (unfunded pilot)",
    significance: "Proposes innovative intervention combining therapeutic approaches with technology to address aging and isolation" },
];

/* 主题色图例 */
const themeColors = {
  "Mental Health": "#8B7FD6",
  "Ethics": "#FF6B35",
  "Social Media": "#37D5D6",
  "Health Technology": "#4FB8FF",
  "Policy": "#A8E6CF",
  "AI Cognition": "#FF85A2",
  "Advertising": "#FFB84D",
  "Film": "#E31B23",
};

const sizeMap = {
  small:  { desktop: 14, mobile: 10 },
  medium: { desktop: 20, mobile: 14 },
  large:  { desktop: 28, mobile: 20 },
};

/* -------------------------- 公共路径 & 图片工具 -------------------------- */
// 兼容 Vite（import.meta.env.BASE_URL）和 CRA（process.env.PUBLIC_URL）
function getBaseUrl() {
  const viteBase = typeof import.meta !== 'undefined' && import.meta?.env?.BASE_URL;
  const craBase  = typeof process !== 'undefined' && process?.env?.PUBLIC_URL;
  const base = viteBase || craBase || '/';
  return base.endsWith('/') ? base.slice(0, -1) : base;
}
function resolveHeroSrc(heroPath) {
  const clean = heroPath.startsWith('/') ? heroPath : `/${heroPath}`;
  return `${getBaseUrl()}${clean}`;
}

/* -------------------------- 圆点节点 -------------------------- */
function ProjectNode({ project, isHovered, onClick, onHover, x, y, mobile }) {
  const sizeValue = mobile ? sizeMap[project.size].mobile : sizeMap[project.size].desktop;
  return (
    <g
      onClick={() => onClick(project)}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      <circle
        cx={x}
        cy={y}
        r={isHovered ? sizeValue * 0.7 : sizeValue * 0.5}
        fill={project.color}
        opacity={isHovered ? 1 : 0.9}
        style={{
          filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </g>
  );
}

/* -------------------------- 主组件 -------------------------- */
export default function ResearchTimeline() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [viewport, setViewport] = useState({ width: 1200, height: 600 });
  const [mobile, setMobile] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  // 右侧详情面板宽度与间距
  const PANEL_WIDTH = 520;
  const PANEL_GAP = 24;

  useEffect(() => {
    document.title = 'Research Journey of Yuting';
    const update = () => {
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);
      const maxSVGWidth = isMobile ? window.innerWidth - 28 : Math.min(1100, window.innerWidth - 160);
      const svgHeight = isMobile ? Math.max(380, window.innerHeight * 0.55) : 520;
      setViewport({ width: maxSVGWidth, height: svgHeight });
      setShowGuide(!isMobile);
      setShowLegend(!isMobile);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 面板打开时，为左侧图形留出空间
  const rightInset = (!mobile && selectedProject) ? (PANEL_WIDTH + PANEL_GAP) : 0;

  const padding = mobile
    ? { top: 48, right: 24, bottom: 100, left: 52 }
    : { top: 56, right: 60, bottom: 96, left: 70 };

  const minYear = 2022;
  const maxYear = 2025;

  const innerWidth  = useMemo(() => Math.max(260, viewport.width - padding.left - padding.right), [viewport, padding]);
  const innerHeight = useMemo(() => Math.max(240, viewport.height - padding.top - padding.bottom), [viewport, padding]);

  const svgWidthWithInset = viewport.width - rightInset;

  const getX = (year, month) => {
    const yearFrac = year + month / 12;
    const t = (yearFrac - minYear) / (maxYear + 1 - minYear);
    return padding.left + t * (svgWidthWithInset - padding.left - padding.right);
  };

  // method ∈ [-1,1]，-1=Qual，+1=Quant
  const getY = (method) => {
    const normalized = (1 - method) / 2;
    const margin = 0.08;
    const yNorm = margin + normalized * (1 - 2 * margin);
    return padding.top + yNorm * innerHeight;
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: mobile ? '100svh' : '100vh',
        maxWidth: '100vw',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        paddingBottom: mobile ? 80 : 100,
        paddingRight: rightInset,
        boxSizing: 'border-box',
        overscrollBehaviorX: 'none',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: mobile ? '18px 18px 12px' : '32px 48px 16px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 15,
          overflow: 'hidden',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: mobile ? '22px' : '32px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.4px',
          }}
        >
          Research Journey of Yuting
        </h1>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: mobile ? '12px' : '15px',
            color: '#666',
            fontWeight: 400,
            letterSpacing: '0.2px',
          }}
        >
          Marginalized Communities × Platform Studies × Participatory Design × Care & Technology
        </p>
      </div>

      {/* Guide Toggle */}
      <button
        onClick={() => setShowGuide(!showGuide)}
        style={{
          position: 'absolute',
          top: mobile ? '72px' : '120px',
          right: mobile ? '12px' : `${12 + rightInset}px`,
          width: mobile ? 36 : 44,
          height: mobile ? 36 : 44,
          borderRadius: '50%',
          border: 'none',
          background: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: mobile ? 16 : 18,
          fontWeight: 600,
          color: '#667eea',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 11,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(102,126,234,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
        }}
      >
        ?
      </button>

      {/* Guide Panel */}
      {showGuide && (
        <div
          style={{
            position: 'absolute',
            top: mobile ? '116px' : '176px',
            right: mobile ? '12px' : `${12 + rightInset}px`,
            background: 'white',
            padding: mobile ? '14px' : '20px',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            maxWidth: mobile ? 180 : 240,
            zIndex: 10,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
          <h3 style={{ margin: '0 0 10px', fontSize: mobile ? 13 : 15, fontWeight: 600, color: '#333' }}>Visual Guide</h3>
          <div style={{ fontSize: mobile ? 11 : 13, color: '#666', lineHeight: 1.6 }}>
            <div style={{ marginBottom: 8 }}>
              <strong>Y-axis:</strong> Method<br />
              <span style={{ fontSize: mobile ? 10 : 12, color: '#999' }}>Top = Quant<br />Bottom = Qual</span>
            </div>
            <div style={{ marginBottom: 8 }}><strong>X-axis:</strong> Timeline</div>
            <div><strong>Color:</strong> Theme<br /><strong>Size:</strong> Scale</div>
          </div>
        </div>
      )}

      {/* 主图（SVG） */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: mobile ? '0 16px' : '0 40px' }}>
        <svg width={svgWidthWithInset} height={viewport.height} style={{ maxWidth: '100%' }}>
          {/* Y 轴标签（同字号） */}
          <text x={padding.left - (mobile ? 32 : 46)} y={padding.top - 8} textAnchor="middle" fontSize={mobile ? 12 : 12} fill="#888" fontWeight={600}>Quant</text>
          <text x={padding.left - (mobile ? 32 : 46)} y={viewport.height - padding.bottom + 18} textAnchor="middle" fontSize={mobile ? 12 : 12} fill="#888" fontWeight={600}>Qual</text>

          {/* 轴线 */}
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={viewport.height - padding.bottom} stroke="#ddd" strokeWidth={1} />
          <line x1={padding.left} y1={viewport.height - padding.bottom} x2={svgWidthWithInset - padding.right} y2={viewport.height - padding.bottom} stroke="#ddd" strokeWidth={1} />

          {/* 年份刻度 */}
          {[2022, 2023, 2024, 2025].map((year) => {
            const x = getX(year, 6);
            return (
              <g key={year}>
                <line x1={x} y1={viewport.height - padding.bottom} x2={x} y2={viewport.height - padding.bottom + 8} stroke="#999" strokeWidth="2" />
                <text x={x} y={viewport.height - padding.bottom + (mobile ? 22 : 26)} textAnchor="middle" fontSize={mobile ? 11 : 12} fill="#666" fontWeight={600}>
                  {mobile ? `'${year.toString().slice(2)}` : year}
                </text>
              </g>
            );
          })}

          {/* 项目节点 */}
          {projects.map((project) => {
            const x = getX(project.year, project.month);
            const y = getY(project.method);
            return (
              <ProjectNode
                key={project.id}
                project={project}
                x={x}
                y={y}
                isHovered={hoveredProject?.id === project.id}
                onClick={setSelectedProject}
                onHover={setHoveredProject}
                mobile={mobile}
              />
            );
          })}

          {/* 悬浮提示（自适应圆角） */}
          {hoveredProject && !mobile && (
            <SvgTooltip
              x={getX(hoveredProject.year, hoveredProject.month)}
              y={getY(hoveredProject.method)}
              text={hoveredProject.title}
              maxWidth={svgWidthWithInset}
            />
          )}
        </svg>
      </div>

      {/* Legend Toggle */}
      <button
        onClick={() => setShowLegend(!showLegend)}
        style={{
          position: 'absolute',
          bottom: mobile ? '14px' : '18px',
          left: mobile ? '12px' : '16px',
          width: mobile ? 36 : 44,
          height: mobile ? 36 : 44,
          borderRadius: '50%',
          border: 'none',
          background: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: mobile ? 16 : 18,
          fontWeight: 600,
          color: '#667eea',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 11,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(102,126,234,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
        }}
      >
        🎨
      </button>

      {/* 图例 */}
      {showLegend && (
        <div
          style={{
            position: 'absolute',
            bottom: mobile ? 8 : 12,
            left: mobile ? 56 : 72,
            display: 'flex',
            gap: mobile ? 10 : 16,
            flexWrap: 'wrap',
            maxWidth: mobile ? 'calc(100vw - 100px)' : 680,
            background: 'rgba(255,255,255,0.95)',
            padding: mobile ? '10px 14px' : '12px 18px',
            borderRadius: 12,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            animation: 'fadeIn 0.3s ease-out',
            pointerEvents: 'none',
          }}
        >
          {Object.entries(themeColors).map(([theme, color]) => (
            <div key={theme} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: mobile ? 10 : 12, height: mobile ? 10 : 12, borderRadius: '50%', background: color }} />
              <span style={{ fontSize: mobile ? 11 : 12, color: '#666', fontWeight: 500 }}>{theme}</span>
            </div>
          ))}
        </div>
      )}

      {/* 右侧详情面板 */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            left: mobile ? 0 : 'auto',
            width: mobile ? '100vw' : `${PANEL_WIDTH}px`,
            maxWidth: mobile ? '100vw' : `${PANEL_WIDTH}px`,
            boxSizing: 'border-box',
            height: '100vh',
            background: 'white',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
            padding: mobile ? '36px 14px' : '52px 28px',
            overflowX: 'hidden',
            overflowY: 'auto',
            zIndex: 20,
            animation: mobile ? 'none' : 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <button
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              border: 'none',
              background: 'transparent',
              fontSize: 26,
              color: '#999',
              cursor: 'pointer',
              padding: 0,
              width: 30,
              height: 30,
            }}
            aria-label="Close"
            title="Close"
          >
            ×
          </button>

          {selectedProject.hero && (
            <img
              src={resolveHeroSrc(selectedProject.hero)}
              alt={selectedProject.title}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              style={{
                width: '100%',
                height: mobile ? 150 : 180,
                objectFit: 'cover',
                borderRadius: 12,
                marginBottom: 20,
                background: '#f4f4f4',
              }}
            />
          )}

          <div style={{ width: 6, height: 36, background: selectedProject.color, borderRadius: 3, marginBottom: 16 }} />

          <h2
            style={{
              margin: '0 0 10px',
              fontSize: mobile ? 20 : 24,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.3,
              letterSpacing: '-0.4px',
            }}
          >
            {selectedProject.title}
          </h2>

          <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '6px 10px',
                background: `${selectedProject.color}20`,
                color: selectedProject.color,
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {selectedProject.theme}
            </span>
            <span
              style={{
                padding: '6px 10px',
                background: '#f5f5f5',
                color: '#666',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {selectedProject.time}
            </span>
            {selectedProject.lab && (
              <span
                style={{
                  padding: '6px 10px',
                  background: '#f0f0f0',
                  color: '#666',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                {selectedProject.lab}
              </span>
            )}
          </div>

          {selectedProject.supervisor && (
            <div style={{ marginBottom: 18, fontSize: 13, color: '#888' }}>
              <strong>Supervised by:</strong> {selectedProject.supervisor}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Research Question
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.7 }}>{selectedProject.summary}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Data & Scale
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.7 }}>{selectedProject.data}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Method & Approach
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.7 }}>{selectedProject.methodDetail}</p>
          </div>

          {selectedProject.significance && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Significance
              </h4>
              <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.7 }}>{selectedProject.significance}</p>
            </div>
          )}

          <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 12, marginTop: 20 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Outcome & Status
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: '#555', lineHeight: 1.6 }}>{selectedProject.outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}
