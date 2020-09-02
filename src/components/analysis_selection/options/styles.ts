import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',

    '& button:first-child': {
      marginRight: '4px',
    },

    '& button:last-child': {
      marginLeft: '4px',
    },
  },
}))
