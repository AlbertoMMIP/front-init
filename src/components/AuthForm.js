import React, { useState, useContext } from "react";
import clsx from 'clsx';
import { authService } from "../services/auth";
import { GlobalContext } from "../context";
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from "@material-ui/core";
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: '500px',
    '& > *': {
      margin: theme.spacing(1),
      width: '70ch',
    }
  },
  marginTop: {
    margin: theme.spacing(6),
  },
  marginBottom: {
    margin: theme.spacing(6),
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '35ch',
  },
}));

function AuthForm({ type }) {
  const classes = useStyles();
  const history = useHistory();
  const [formFields, setformFields] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [, dispatch] = useContext(GlobalContext);

  const handleInputChange = ({ target: { name, value } }) => {
    setformFields({
      ...formFields,
      [name]: value
    });
  };
  const handleClickShowPassword = () => {
    setformFields({ ...formFields, showPassword: !formFields.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (type === "login") {
      //const { data: user } = await authService.login(formFields);
      formFields._id = formFields.username;
      const user = formFields;
      dispatch({ type: "LOGIN", payload: user });
      history.push('/secret');
    } else if (type === "signup") {
      const { data: user } = await authService.register(formFields);
      dispatch({ type: "SIGNUP", payload: user });
    }
  };

  return (
    <div className={classes.root}>
      <Paper>
          <center><DesktopMacIcon fontSize='large' className={classes.marginTop} /></center>
          <FormControl>
            <TextField 
              id="username" 
              label="Username" 
              name="username"
              value={formFields.username}
              onChange={handleInputChange}
              className={clsx(classes.margin, classes.textField)} />
          </FormControl> <br />
          <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                className={clsx(classes.margin, classes.textField)}
                id="password"
                name="password"
                type={formFields.showPassword ? 'text' : 'password'}
                value={formFields.password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {formFields.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl> <br />
            <FormControl>
              <Button className={clsx(classes.marginBottom, classes.textField)} variant="contained" color="primary" disabled={!formFields.username || !formFields.password} onClick={(e) => handleSubmit(e)} >
                {type}
              </Button>
            </FormControl>
      </Paper>
    </div>
  );
}

export default AuthForm;
