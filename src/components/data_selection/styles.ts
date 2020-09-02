import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontSize: '24px',
    fontWeight: 500,
    textAlign: 'center',
  },
  dataSelectionWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  dataSelectionFormWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  controlButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(4, 0)
  }
}))
