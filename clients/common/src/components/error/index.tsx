import { h } from 'preact'
import { colors } from '../..'
import { Warning } from '../../assets'
import { Box } from '../boxes'
import { Span } from '../typograhpy'

type ErrorPropsType = {
  errorMessages: string[] | string
}

export const Error = ({ errorMessages }: ErrorPropsType) => {
  return (
    <Box mt="5rem">
      <Warning />
      <Box mt="1rem" maxWidth="180px">
        {typeof errorMessages === 'string' ? (
          <Span fc={colors.destructive.main} fontSize="0.875rem">
            {errorMessages}
          </Span>
        ) : (
          errorMessages.map(message => (
            <Span fc={colors.destructive.main} fontSize="0.875rem">
              {message}
            </Span>
          ))
        )}
      </Box>
    </Box>
  )
}
