export const MoonMobile = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_139_2053)">
      <circle cx="14" cy="11" r="8" fill="url(#paint0_linear_139_2053)" />
      <circle cx="14" cy="11" r="6.62857" fill="url(#paint1_linear_139_2053)" />
      <mask
        id="mask0_139_2053"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="3"
        width="16"
        height="16"
      >
        <circle cx="14" cy="11" r="8" fill="url(#paint2_linear_139_2053)" />
      </mask>
      <g mask="url(#mask0_139_2053)">
        <circle
          cx="18.5715"
          cy="14.2001"
          r="3.42857"
          fill="url(#paint3_linear_139_2053)"
        />
        <circle
          cx="12.1714"
          cy="17.8572"
          r="2.05714"
          fill="url(#paint4_linear_139_2053)"
        />
        <circle
          cx="14.6857"
          cy="10.0857"
          r="0.457143"
          fill="url(#paint5_linear_139_2053)"
        />
        <circle
          cx="12.1714"
          cy="12.6"
          r="0.914286"
          fill="url(#paint6_linear_139_2053)"
        />
        <circle
          cx="7.48572"
          cy="12.2571"
          r="1.25714"
          fill="url(#paint7_linear_139_2053)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_139_2053"
        x="0"
        y="0"
        width="24"
        height="24"
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
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_139_2053"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_139_2053"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_139_2053"
        x1="14"
        y1="3"
        x2="14"
        y2="19"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D6E9FF" />
        <stop offset="1" stopColor="#CDE4FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_139_2053"
        x1="14"
        y1="4.37146"
        x2="14"
        y2="17.6286"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CEE5FF" />
        <stop offset="0.9999" stopColor="#EDF6FF" />
        <stop offset="1" stopColor="#F1F9FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_139_2053"
        x1="14"
        y1="3"
        x2="14"
        y2="19"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DDEDFF" />
        <stop offset="1" stopColor="#3483F9" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_139_2053"
        x1="18.5715"
        y1="10.7715"
        x2="18.5715"
        y2="17.6286"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_139_2053"
        x1="12.1714"
        y1="15.8"
        x2="12.1714"
        y2="19.9143"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_139_2053"
        x1="14.6857"
        y1="9.62854"
        x2="14.6857"
        y2="10.5428"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_139_2053"
        x1="12.1714"
        y1="11.6857"
        x2="12.1714"
        y2="13.5142"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_139_2053"
        x1="7.48572"
        y1="11"
        x2="7.48572"
        y2="13.5143"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C8D7FF" />
        <stop offset="1" stopColor="#DCF0FF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
