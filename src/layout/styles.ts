import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
  },

  container: {
    padding: theme.spacing(5, 5, 0, 5),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',

    '& *': {
      fontFamily: 'Roboto, sans-serif'
    }
  },
}))
