import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  tooltipsContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: '16px',
    border: `1px solid ${theme.palette.primary.light}`,
  },
}))
