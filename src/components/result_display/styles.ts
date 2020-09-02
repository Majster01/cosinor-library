import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  height?: number
}

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
}))

export const useResultsStyles = makeStyles((theme: Theme) => ({
  tabContent: {
    width: '100%',
    overflow: 'auto',
  },

  resultDisplayContainer: {
    flexGrow: 1,
    maxWidth: '70%',
    flexBasis: '70%',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      maxWidth: '100%',
      flexBasis: '100%',
    }
  },

  appBar: {
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: '72px',
  },
}))
