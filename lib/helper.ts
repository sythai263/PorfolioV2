import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export function getPosition(
  index: number,
  total: number,
  radiusPercent: number,
  offsetAngle = 0,
) {
  const angle = ((index / total) * 360 + offsetAngle) * (Math.PI / 180);
  const x = 50 + radiusPercent * Math.cos(angle);
  const y = 50 - radiusPercent * Math.sin(angle);
  return { left: `${x}%`, top: `${y}%` };
}

export function getSocialIcon(iconName: string) {
  switch (iconName) {
    case "Github":
      return FaGithub;
    case "Linkedin":
      return FaLinkedin;
    case "Twitter":
      return FaTwitter;
    default:
      return FaGithub;
  }
}
