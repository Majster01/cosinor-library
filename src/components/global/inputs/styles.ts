import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  pairSelectionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    textAlign: 'start',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: theme.spacing(2),
  },

  transferButton: {
    alignSelf: 'center',
  },

  pairsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(2),

    '& > span': {
      marginTop: theme.spacing(1),

      '&:first-child': {
        marginTop: theme.spacing(0),
      },

      '& button': {
        marginLeft: theme.spacing(1)
      }
    },
  },

  selected: {
    fontWeight: theme.typography.fontWeightMedium,
  },

  notSelected: {
    fontWeight: theme.typography.fontWeightRegular,
  },

  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  chip: {
    margin: 2,
  },
}))
