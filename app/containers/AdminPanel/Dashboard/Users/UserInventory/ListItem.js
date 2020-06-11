import React from 'react'
import { Link } from 'react-router-dom'
import { object, array } from 'prop-types'
import styled from 'styled-components'
import { format, parseISO } from 'date-fns'
import idx from 'idx'

const FlexTable = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
  flex-flow: row;
  > div {
    align-items: center;
    display: flex;
    width: calc(100% / 10.5);
    text-align: left;
  }
`
const ItemWrapper = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  border-radius: 10px;
  height: 112px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
`

const ListItem = ({ user, columns }) => (
  <ItemWrapper>
    <FlexTable>
      {
        columns.map(column => (
          <>
            { column.field ==='date' &&
            <div style={{ width: column.width }} key={column.id}>
              <StyledText>
                {format(parseISO(idx(user, column.accessor)), 'dd/MM/yyyy hh:mm aa')}
              </StyledText>
            </div>
            }
            { !column.field &&
              <div style={{ width: column.width }} key={column.id}>
                <StyledLink to={`/admin-panel/users/support/${user.id}`}>
                  <StyledText>
                    {idx(user, column.accessor)}
                  </StyledText>
                </StyledLink>
              </div>
            }
          </>
        ))
      }

    </FlexTable>
  </ItemWrapper>
)

ListItem.propTypes = {
  user: object,
  columns: array
}
ListItem.defaultProps = {}
export default ListItem
