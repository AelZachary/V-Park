import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export function PencilEditIcon({
  width = 20,
  height = 20,
  strokeColor = '#1565C0',
  strokeWidth = 1.8,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.1626 6.31255L10.6132 11.862C10.1902 12.2849 9.66037 12.585 9.08012 12.73L6.66687 13.3333L7.27018 10.9201C7.41524 10.3398 7.71526 9.81 8.13819 9.387L13.6876 3.83757L14.5126 3.01258C15.1961 2.32914 16.3042 2.32914 16.9876 3.01258C17.671 3.69603 17.671 4.80411 16.9876 5.48756L16.1626 6.31255ZM13.6876 3.83757L16.1626 6.31255"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M15.8333 11.2498C15.8333 13.9894 15.8332 15.3592 15.0767 16.2812C14.9382 16.4499 14.7834 16.6047 14.6146 16.7432C13.6927 17.4998 12.3228 17.4998 9.58325 17.4998H9.16667C6.02397 17.4998 4.45263 17.4998 3.47632 16.5235C2.50002 15.5473 2.5 13.9758 2.5 10.8332V10.4165C2.5 7.67694 2.5 6.30716 3.25662 5.3852C3.39514 5.21642 3.54992 5.06165 3.7187 4.92312C4.64066 4.1665 6.01043 4.1665 8.75 4.1665"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function UserIcon({
  width = 20,
  height = 20,
  strokeColor = '#141B34',
  strokeWidth = 1.15,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.3333 10.0001C18.3333 14.6025 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6025 1.66663 10.0001C1.66663 5.39771 5.39759 1.66675 9.99996 1.66675C14.6023 1.66675 18.3333 5.39771 18.3333 10.0001Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M12.2917 7.91667C12.2917 9.18232 11.2657 10.2083 10 10.2083C8.73439 10.2083 7.70837 9.18232 7.70837 7.91667C7.70837 6.65101 8.73439 5.625 10 5.625C11.2657 5.625 12.2917 6.65101 12.2917 7.91667Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M4.58325 15.8337L5.05025 15.0164C5.79209 13.7182 7.17269 12.917 8.66793 12.917H11.3319C12.8271 12.917 14.2077 13.7182 14.9496 15.0164L15.4166 15.8337"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PhoneIcon({
  width = 20,
  height = 20,
  strokeColor = '#141B34',
  strokeWidth = 1.15,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M11.25 1.6665H8.75004C6.78586 1.6665 5.80376 1.6665 5.19357 2.2767C4.58337 2.88689 4.58337 3.86899 4.58337 5.83317V14.1665C4.58337 16.1307 4.58337 17.1128 5.19357 17.723C5.80376 18.3332 6.78586 18.3332 8.75004 18.3332H11.25C13.2142 18.3332 14.1963 18.3332 14.8065 17.723C15.4167 17.1128 15.4167 16.1307 15.4167 14.1665V5.83317C15.4167 3.86899 15.4167 2.88689 14.8065 2.2767C14.1963 1.6665 13.2142 1.6665 11.25 1.6665Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.6667 1.6665H8.33337L8.75004 2.49984H11.25L11.6667 1.6665Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CarIcon({
  width = 20,
  height = 20,
  strokeColor = 'black',
  strokeWidth = 1.15,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15 9.16675H16.6666C17.5871 9.16675 18.3333 9.91294 18.3333 10.8334V11.6667C18.3333 12.5872 17.5871 13.3334 16.6666 13.3334M15 9.16675L13.7132 5.30637C13.4863 4.6258 12.8494 4.16675 12.132 4.16675H8.33329M15 9.16675H8.33329M3.33329 9.16675L4.62009 5.30637C4.84694 4.6258 5.48384 4.16675 6.20122 4.16675H8.33329M3.33329 9.16675H8.33329M3.33329 9.16675C2.41282 9.16675 1.66663 9.91294 1.66663 10.8334V11.6667C1.66663 12.5872 2.41282 13.3334 3.33329 13.3334M8.33329 9.16675V4.16675M6.66663 13.3334H13.3333M6.66663 13.3334C6.66663 14.2539 5.92043 15.0001 4.99996 15.0001C4.07948 15.0001 3.33329 14.2539 3.33329 13.3334M6.66663 13.3334C6.66663 12.4129 5.92043 11.6667 4.99996 11.6667C4.07948 11.6667 3.33329 12.4129 3.33329 13.3334M13.3333 13.3334C13.3333 14.2539 14.0795 15.0001 15 15.0001C15.9204 15.0001 16.6666 14.2539 16.6666 13.3334M13.3333 13.3334C13.3333 12.4129 14.0795 11.6667 15 11.6667C15.9204 11.6667 16.6666 12.4129 16.6666 13.3334"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

export function CarOutlineIcon({
  width = 20,
  height = 20,
  strokeColor = '#141B34',
  strokeWidth = 1.15,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.08337 10L3.75004 10.8333"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.9166 10.4167L16.25 10.8334"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66663 14.5833L6.87135 14.0715C7.1758 13.3104 7.32803 12.9298 7.64546 12.7149C7.9629 12.5 8.37278 12.5 9.19254 12.5H10.8074C11.6271 12.5 12.037 12.5 12.3545 12.7149C12.6719 12.9298 12.8241 13.3104 13.1286 14.0715L13.3333 14.5833"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.75 7.5L4.65692 4.77924C5.0236 3.67921 5.20694 3.12919 5.64341 2.8146C6.07989 2.5 6.65966 2.5 7.8192 2.5H12.1808C13.3403 2.5 13.9201 2.5 14.3566 2.8146C14.7931 3.12919 14.9764 3.67921 15.3431 4.77924L16.25 7.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M3.74996 7.5H16.25C17.0476 8.3446 18.3333 9.52079 18.3333 10.833V13.7252C18.3333 14.2005 18.017 14.6007 17.5973 14.6562L15 15H4.99996L2.40259 14.6562C1.98291 14.6007 1.66663 14.2005 1.66663 13.7252V10.833C1.66663 9.52079 2.95228 8.3446 3.74996 7.5Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BackIcon({
  width = 24,
  height = 24,
  strokeColor = '#1565C0',
  strokeWidth = 2.5,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19L8 12L15 5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
