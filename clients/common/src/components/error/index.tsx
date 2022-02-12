import { h } from 'preact'
import { colors } from '../..'
import { Warning } from '../../assets'
import { Box } from '../boxes'
import { Span } from '../typograhpy'

type ErrorPropsType = {
  errorMessage: string[] | string
}

export const Error = ({ errorMessage }: ErrorPropsType) => {
  return (
    <Box mt="5rem">
      <Warning />
      <Box mt="1rem" maxWidth="180px">
        {typeof errorMessage === 'string' ? (
          <Span fc={colors.destructive.main} fontSize="0.875rem">
            {errorMessage}
          </Span>
        ) : (
          errorMessage.map(message => (
            <Span fc={colors.destructive.main} fontSize="0.875rem">
              {message}
            </Span>
          ))
        )}
      </Box>
    </Box>
  )
}
