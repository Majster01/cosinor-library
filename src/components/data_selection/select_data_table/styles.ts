import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  key: string
}

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    paddingTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  table: {
    maxWidth: '100%',
    width: 'fit-content',
    display: 'block',
    overflow: 'auto',
    margin: '0 auto',
  },
  tableBody: {
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'auto',
  },
  header: {
    minWidth: '100%',
  },
  row: {
    minWidth: '100%',

    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.16)',
    }
  },
  nameCell: {
    minWidth: '100px'
  },
  cell: {
    maxWidth: '50px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordBreak: 'normal',
  },
  selectedRow: {
    '&.Mui-selected': {
      backgroundColor: 'rgba(63, 81, 181, 0.08)',

      '&:hover': {
        backgroundColor: 'rgba(63, 81, 181, 0.16)',
      }
    },
  },

  selectedRowGroup: {
    backgroundColor: 'rgba(63, 81, 181, 0.08)',

    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.16)',
    }
  },

  xlsxRow: {
    display: 'flex',
    alignItems: 'center',
  },

  paddingNormal: {
    padding: theme.spacing(2)
  }
}))
