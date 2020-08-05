import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },

  container: {
    maxWidth: '1024px',
    height: '100vh',
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    '& *': {
      fontFamily: 'Roboto, sans-serif'
    }
  }
}))
