import styled, { keyframes } from 'styled-components'
import { Variables } from '../../common'

const progress = keyframes`
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
`

export const SkeletonWrapper = styled.span`
  animation: ${progress} 1.2s ease-in-out infinite;
  background-color: ${Variables.Color.n200};
  background-image: linear-gradient(90deg, ${Variables.Color.n200}, ${Variables.Color.n300}, ${Variables.Color.n200});
  background-repeat: no-repeat;
  background-size: 200px 100%;
  border: 1px solid ${Variables.Color.n200};
  display: inline-flex;
`