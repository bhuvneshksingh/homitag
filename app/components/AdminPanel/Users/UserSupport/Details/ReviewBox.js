import React from 'react'
import styled from 'styled-components'

const StyledHeading = styled.h4`
   margin-left: 30px;
   font-weight: 500;
   font-size: 16px;
   margin-bottom: 30px;
   color: #313334;
`
const FlexTable = styled.div`
  display: flex;
  flex-flow: row;
  padding: 0 32px;
  max-height: 32px;
  min-height: 32px;
  transition: padding ease 0.2s;
  > div {
    width: calc(100% / 2);
    p {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }
  }
  &.deactivate {
    padding-left: 96px;
  }
`
const StyledArrow = styled.span`
  width: 10px;
  height: 10px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  position: absolute;
  right: 34px;
`
const DownArrow = styled(StyledArrow)`
  && {
    transform: rotate(135deg);
    top: 0;
  }
`
const StyledSortable = styled.p`
  position: relative;
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
`
const ItemWrapper = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  border-radius: 10px;
  height: 80px;
  display: flex;
  align-items: center;
  && {
    margin-bottom: 15px;
  }
`
const StyledText = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: white;
`
const ReviewBox = () => (
  <>
    <StyledHeading>
      Review History
    </StyledHeading>

    <FlexTable>
      <div>
        <StyledSortable style={{ width: 130 }}>
          Updated By
          <DownArrow/>
        </StyledSortable>
      </div>
      <div>
        <StyledSortable style={{ width: 130 }}>
          Last Updated
          <DownArrow/>
        </StyledSortable>
      </div>
      <div style={{ textAlign: 'right'}}>
        <StyledSortable>
          Action
        </StyledSortable>
      </div>
    </FlexTable>

    <ItemWrapper>
      <FlexTable style={{ alignItems: 'center' }}>
        <div>
          <StyledText style={{ width: 130 }}>
            Agent Name
          </StyledText>
        </div>
        <div >
          <StyledText style={{ width: 140 }}>
            08/08/19 10:01 PM
          </StyledText>
        </div>
        <div>
          <StyledText>
            View
          </StyledText>
        </div>
      </FlexTable>
    </ItemWrapper>
    <ItemWrapper>
      <FlexTable style={{ alignItems: 'center' }}>
        <div>
          <StyledText style={{ width: 130 }}>
            Agent Name
          </StyledText>
        </div>
        <div >
          <StyledText style={{ width: 140 }}>
            08/08/19 10:01 PM
          </StyledText>
        </div>
        <div>
          <StyledText>
            View
          </StyledText>
        </div>
      </FlexTable>
    </ItemWrapper>
    <ItemWrapper>
      <FlexTable style={{ alignItems: 'center' }}>
        <div>
          <StyledText style={{ width: 130 }}>
            Agent Name
          </StyledText>
        </div>
        <div >
          <StyledText style={{ width: 140 }}>
            08/08/19 10:01 PM
          </StyledText>
        </div>
        <div>
          <StyledText>
            View
          </StyledText>
        </div>
      </FlexTable>
    </ItemWrapper>

  </>
)

export default ReviewBox
