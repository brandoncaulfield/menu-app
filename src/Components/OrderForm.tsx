// React
import { useState } from 'react';

// MUI
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// react-query
import { useQuery } from 'react-query';

// API
import { getMenu } from '../API/menuAPI';

// Context
import { useUserContext } from '../Context/UserContext';

// Rules
import { coursesCountChecker } from '../Helper/Rules';

// Types
export type Choices = {
    starters?: string;
    mains?: string;
    desserts?: string;
};

export function OrderForm() {
    const [choices, setChoices] = useState<Choices>({ starters: '', mains: '', desserts: '' });
    const [selectedDiner, setSelectedDiner] = useState<number>();
    const [amount, setAmount] = useState<Number>(0);

    const { user, diners } = useUserContext();
    const [userData, setUserData] = user;
    const [dinerData, setDinerData] = diners;

    const query: any = useQuery('menu', getMenu);

    const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const category = evt.target.name;
        const choice = evt.target.value;

        // Rules check
        if (!coursesCountChecker(choices)) {
            alert("We're terribly sorry but we're only accepting orders of no more than 2 dishes.");
            return;
        }
        // I know there's a better way to do this but ran out of time
        let item = query.data[category].find((category: any) => category.name === choice);

        const newAmount: number = amount + item.price;
        setAmount(newAmount);

        setChoices({ ...choices, [category]: choice });
    };

    const handleSelectChange = (evt: any) => {
        setSelectedDiner(evt.target.value);
    };

    const handleSave = () => {
        if (selectedDiner === undefined) {
            alert('Please choose a diner first');
        } else {
            alert(`Thanks you for your order ${userData.username} on behalf of diner ${selectedDiner}`);
        }
    };

    const handleClear = () => {
        setChoices({ starters: '', mains: '', desserts: '' });
    };

    if (query.isLoading)
        return (
            <>
                <span>Loading...</span>;
            </>
        );

    if (query.error) return <span>'An error has occurred: ';</span>;

    if (query.data) {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'left',
                        }}
                    >
                        <Grid item xs={8}>
                            <Grid item>
                                <InputLabel sx={{ marginTop: 2 }} id="username">
                                    Your Username
                                </InputLabel>
                                <TextField id="username" variant="outlined" disabled value={userData.username} />
                                <InputLabel sx={{ marginTop: 2 }} id="diner">
                                    Please select your diner
                                </InputLabel>
                                <Select
                                    labelId="diner-select-label"
                                    id="diner-simple-select"
                                    value={selectedDiner}
                                    label="Diner"
                                    onChange={handleSelectChange}
                                >
                                    {dinerData.diners.map((diner: number) => (
                                        <MenuItem value={diner}>{diner}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Starters</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="starters"
                                    value={choices.starters}
                                    onChange={handleRadioChange}
                                >
                                    {query.data.starters.map((starter: { id: number; name: string; price: number }) => (
                                        <FormControlLabel
                                            id={JSON.stringify(starter.id)}
                                            value={starter.name}
                                            control={<Radio />}
                                            label={`${starter.name} - ${starter.price}`}
                                        />
                                    ))}
                                </RadioGroup>

                                <FormLabel id="demo-radio-buttons-group-label">Mains</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="mains"
                                    value={choices.mains}
                                    onChange={handleRadioChange}
                                >
                                    {query.data.mains.map((main: { id: number; name: string; price: number }) => (
                                        <FormControlLabel
                                            value={main.name}
                                            control={<Radio />}
                                            label={`${main.name} - ${main.price}`}
                                        />
                                    ))}
                                </RadioGroup>

                                <FormLabel id="demo-radio-buttons-group-label">Desserts</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="desserts"
                                    value={choices.desserts}
                                    onChange={handleRadioChange}
                                >
                                    {query.data.desserts.map((dessert: { id: number; name: string; price: number }) => (
                                        <FormControlLabel
                                            value={dessert.name}
                                            control={<Radio />}
                                            label={`${dessert.name} - ${dessert.price}`}
                                        />
                                    ))}
                                </RadioGroup>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={amount}
                                    // onChange={handleChange('amount')}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                    disabled
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleClear}>
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    } else {
        return <span>Something's not right here...</span>;
    }
}
