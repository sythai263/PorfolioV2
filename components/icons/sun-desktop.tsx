export const SunDesktop = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_39_622)">
      <circle cx="11" cy="12" r="10" fill="url(#paint0_linear_39_622)" />
      <circle cx="11" cy="11.9999" r="8.28571" fill="url(#paint1_linear_39_622)" />
      <circle cx="11" cy="12" r="10" fill="#FF9255" />
      <circle cx="11" cy="11.9999" r="8.28571" fill="url(#paint2_linear_39_622)" />
      <mask
        id="mask0_39_622"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="2"
        width="20"
        height="20"
      >
        <circle cx="11" cy="12" r="10" fill="url(#paint3_linear_39_622)" />
      </mask>
      <g mask="url(#mask0_39_622)">
        <path
          d="M13.1429 12.8646C18.5143 6.57885 23.8571 6.43599 25.8572 7.15028L29.1429 10.2931L26.2857 23.8646L5.57144 30.2931L-5.99999 25.0074L-7.28571 12.436C-2.71428 15.1979 7.77144 19.1503 13.1429 12.8646Z"
          fill="url(#paint4_linear_39_622)"
        />
        <path
          d="M10.1429 11.9951C-1.62763 4.85717 -5.0951 7.02723 -6.87763 8.18169L-9.35384 11.9951L-3.4566 24.5477L18.1804 26.0479L28.2288 18.2462L26.5933 5.71549C22.7783 9.45333 17.6371 16.5397 10.1429 11.9951Z"
          fill="url(#paint5_linear_39_622)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_39_622"
        x="0"
        y="0"
        width="26"
        height="26"
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
        <feOffset dx="2" dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.412917 0 0 0 0 0.412917 0 0 0 0 0.412917 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_39_622" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_39_622" result="shape" />
      </filter>
      <linearGradient
        id="paint0_linear_39_622"
        x1="11"
        y1="2"
        x2="11"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC123" />
        <stop offset="1" stopColor="#F8832E" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_39_622"
        x1="11"
        y1="3.71423"
        x2="11"
        y2="20.2857"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFBF24" />
        <stop offset="1" stopColor="#F4924B" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_39_622"
        x1="11"
        y1="3.71423"
        x2="11"
        y2="20.2857"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFBF24" />
        <stop offset="1" stopColor="#F4924B" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_39_622"
        x1="11"
        y1="2"
        x2="11"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC123" />
        <stop offset="1" stopColor="#F8832E" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_39_622"
        x1="10.9286"
        y1="6.85718"
        x2="10.9286"
        y2="30.2931"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF9D55" stopOpacity="0.6" />
        <stop offset="1" stopColor="#FD8A37" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_39_622"
        x1="7.58471"
        y1="4.46834"
        x2="12.9664"
        y2="27.278"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFBD3E" stopOpacity="0.49" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)
