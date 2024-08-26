import Button from './Button';
import Table from './Table';
import ToggleButton from './ToggleButton';
import CssBaseline from './CssBaseline';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Button(theme),
    Table(theme),
    ToggleButton(theme),
    CssBaseline(theme),
  );
}
