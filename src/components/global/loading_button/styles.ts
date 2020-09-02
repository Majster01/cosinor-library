import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },

  buttonContainer: {
    position: 'relative',
  },
}))
