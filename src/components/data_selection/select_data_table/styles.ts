import { makeStyles, Theme } from "@material-ui/core";

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
    maxHeight: '400px',
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
  },
  nameCell: {
    minWidth: '100px'
  },
  cell: {
    maxWidth: '50px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordBreak: 'normal',
  }
}))
