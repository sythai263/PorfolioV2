export const MoonDesktop = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_39_631)">
      <circle cx="16" cy="13" r="10" fill="url(#paint0_linear_39_631)" />
      <circle cx="16" cy="12.9999" r="8.28571" fill="url(#paint1_linear_39_631)" />
      <mask
        id="mask0_39_631"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="3"
        width="20"
        height="20"
      >
        <circle cx="16" cy="13" r="10" fill="url(#paint2_linear_39_631)" />
      </mask>
      <g mask="url(#mask0_39_631)">
        <circle cx="21.7143" cy="16.9999" r="4.28571" fill="url(#paint3_linear_39_631)" />
        <circle cx="13.7143" cy="21.5714" r="2.57143" fill="url(#paint4_linear_39_631)" />
        <circle cx="16.8571" cy="11.8572" r="0.571429" fill="url(#paint5_linear_39_631)" />
        <circle cx="13.7143" cy="15" r="1.14286" fill="url(#paint6_linear_39_631)" />
        <circle cx="7.85713" cy="14.5714" r="1.57143" fill="url(#paint7_linear_39_631)" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_39_631"
        x="0"
        y="0"
        width="28"
        height="28"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-2" dy="1" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.411765 0 0 0 0 0.411765 0 0 0 0 0.411765 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_39_631" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_39_631" result="shape" />
      </filter>
      <linearGradient
        id="paint0_linear_39_631"
        x1="16"
        y1="3"
        x2="16"
        y2="23"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D6E9FF" />
        <stop offset="1" stopColor="#CDE4FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_39_631"
        x1="16"
        y1="4.71423"
        x2="16"
        y2="21.2857"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CEE5FF" />
        <stop offset="0.9999" stopColor="#EDF6FF" />
        <stop offset="1" stopColor="#F1F9FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_39_631"
        x1="16"
        y1="3"
        x2="16"
        y2="23"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DDEDFF" />
        <stop offset="1" stopColor="#3483F9" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_39_631"
        x1="21.7143"
        y1="12.7142"
        x2="21.7143"
        y2="21.2857"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_39_631"
        x1="13.7143"
        y1="19"
        x2="13.7143"
        y2="24.1429"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_39_631"
        x1="16.8571"
        y1="11.2858"
        x2="16.8571"
        y2="12.4286"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_39_631"
        x1="13.7143"
        y1="13.8572"
        x2="13.7143"
        y2="16.1429"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_39_631"
        x1="7.85713"
        y1="13"
        x2="7.85713"
        y2="16.1429"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)
