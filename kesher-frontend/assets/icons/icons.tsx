import * as React from "react"
import { Text } from "react-native"
import Svg, { Path } from "react-native-svg"

function Message() {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M2.36 12.665l.029-.527h-.653C1.12 12.138.5 11.479.5 10.529V2.963c0-.95.619-1.608 1.236-1.608h12.528c.617 0 1.236.658 1.236 1.608v7.566c0 .95-.619 1.609-1.236 1.609H5.528l-.138.112-3.15 2.566.12-2.15z"
        fill="#804ED9"
        stroke="#804ED9"
      />
      <Path
        d="M3.597 5.072h8.806M3.597 8.173h4.837"
        stroke="#fff"
        strokeWidth={0.6}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  )
}

function Send() {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      >
      <Path d="M17.218 2.268L2.477 8.388c-.347.147-.313.662.065.746L9.33 10.67l1.535 6.787c.083.377.602.415.745.065l6.123-14.74a.395.395 0 00-.515-.514M3.92 8.641l11.772-4.89-6.157 6.158L3.92 8.641zm7.438 7.437l-1.268-5.613 6.157-6.157-4.889 11.77z"
        fill="black"
      />
    </Svg>
  )
}

function Drawer() {
  return (
    <Svg
      width={26}
      height={19}
      viewBox="0 0 26 19"
      fill="none"
    >
      <Path
        d="M25.091 1.581H1.058M20.433 9.221H1.058M15.433 17.581H1.058"
        stroke="#fff"
        strokeWidth={1.4}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function ArrowDown() {
  return (
    <Svg
      width={14}
      height={8}
      viewBox="0 0 14 8"
      fill="none"
    >
      <Path
        d="M12.864 1.035l-6 6-6-6"
        stroke="#fff"
        strokeWidth={1.3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function TextBubble() {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
    >
      <Path
        d="M.835 14.065h0C1.592 6.35 7.965.92 16.468.92c8.554 0 15.287 5.612 15.287 12.26 0 6.7-6.734 12.31-15.287 12.31-2.044 0-2.927-.183-5.758-.916h-.004c-.969-.243-1.795-.169-2.448.246-.645.41-1.027 1.095-1.239 1.874-.323 1.194-.288 2.758-.06 4.388C2.43 26.612.3 19.46.834 14.065z"
        fill="#fff"
        stroke="#3A3A35"
      />
      <Path
        d="M11.32 14.8a1.472 1.472 0 10-.002-2.943 1.472 1.472 0 00.002 2.944zM16.223 14.8a1.472 1.472 0 10-.002-2.943 1.472 1.472 0 00.002 2.944zM21.126 14.8a1.472 1.472 0 10-.002-2.943 1.472 1.472 0 00.002 2.944z"
        fill="#3A3A35"
      />
    </Svg>
  )
}

function X() {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
    >
      <Path
        d="M1.3 2.045a.7.7 0 11.99-.99l15.981 15.98a.7.7 0 01-.99.99L1.301 2.045z"
        fill="#3A3A35"
      />
      <Path
        d="M17.281 1.055a.7.7 0 11.99.99l-15.98 15.98a.7.7 0 01-.99-.99l15.98-15.98z"
        fill="#3A3A35"
      />
    </Svg>
  )
}

function V() {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M20.697.87L8.425 17.439l-3.623-4.518a2.246 2.246 0 00-1.481-.81 2.287 2.287 0 00-1.642.435c-.466.35-.769.863-.842 1.427-.073.564.09 1.133.453 1.582l5.401 6.659c.21.255.477.461.78.602.305.141.639.213.976.212.34-.001.675-.077.98-.222.304-.144.57-.354.777-.614L24.23 3.482c.36-.454.518-1.027.438-1.594a2.14 2.14 0 00-.86-1.425 2.3 2.3 0 00-1.655-.422 2.255 2.255 0 00-1.48.829h.023z"
        fill="#804ED9"
      />
    </Svg>
  )
}


const Icons = {messege: <Message />, send: <Send />, drawer: <Drawer />, arrowDown: <ArrowDown />, textBubble: <TextBubble />, x: <X />, v: <V />}
export default Icons;