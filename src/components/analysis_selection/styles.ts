import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(3),
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    marginRight: theme.spacing(3),
    maxWidth: 'calc(30% - 24px)',
    flexGrow: 1,
    flexBasis: '30%',
    position: 'sticky',
    top: '72px',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      flexBasis: '100%',
      marginRight: theme.spacing(0),
      position: 'relative',
      top: 'unset',
    }
  },
}))
