import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepper: {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  stepperHover: {
    cursor: 'pointer',
  },
  content: {
    marginTop: theme.spacing(5),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    }
  },
}))
