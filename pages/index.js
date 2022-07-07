import { Container, Button, Box, Input } from '@mui/material';
import { useForm } from 'react-hook-form';

const Index = () => {

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit
    } = useForm();

    const myHandleSubmit = async ({ cardNumber, expirationDate, cvv, amount }) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/pay/registration`, {
                cardNumber,
                expirationDate,
                cvv,
                amount
            })
            console.log(response)
        } catch (e) {
            console.log(e.response)
        }
    }

    return (
        <div className='background-gradient'>
            <Container sx={{ pt: '12vh' }} maxWidth='sm'>
                <Box
                    className='form-gradient'
                    name='payment'
                    method="post"
                    onSubmit={handleSubmit(myHandleSubmit)}
                    component='form'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '350px',
                        border: '2px solid #1976d2',
                        borderRadius: '15px',
                        m: 'auto',
                        p: '10px'
                    }}
                >
                    <Input
                        {...register('cardNumber', {
                            required: 'requierd',
                            minLength: {
                                value: 16,
                                message: 'card number must be 16 digits'
                            },
                            maxLength: {
                                value: 16,
                                message: 'card number must be 16 digits'
                            },
                        })}
                        name='cardNumber'
                        type='number'
                        placeholder='Card Number'
                        sx={{ color: 'var(--color-light)' }}
                    />
                    <Box sx={{
                        mt: 1,
                        color: 'var(--color-error)'
                    }}>
                        {errors?.cardNumber && <p>{errors?.cardNumber?.message || 'error'}</p>}
                    </Box>

                    <Input
                        {...register('expirationDate', {
                            required: 'requierd',
                            pattern: {
                                value: /^((0[1-9])|(1[0-2]))\/(\d{4})$/,
                                message: 'mm/yyyy'
                            }
                        })}
                        name='expirationDate'
                        placeholder='Expiration Date'
                        sx={{ mt: 2, color: 'var(--color-light)' }}
                    />
                    <Box sx={{
                        mt: 1,
                        color: 'var(--color-error)'
                    }}>
                        {errors?.expirationDate && <p>{errors?.expirationDate?.message || 'error'}</p>}
                    </Box>

                    <Input
                        {...register('cvv', {
                            required: 'requierd',
                            minLength: {
                                value: 3,
                                message: 'CVV must be 3 digits'
                            },
                            maxLength: {
                                value: 3,
                                message: 'CVV number must be 3 digits'
                            },
                        })}
                        name='cvv'
                        type='number'
                        placeholder='CVV'
                        autoComplete="off"
                        sx={{ mt: 2, color: 'var(--color-light)' }}
                    />
                    <Box sx={{
                        mt: 1,
                        color: 'var(--color-error)'
                    }}>
                        {errors?.cvv && <p>{errors?.cvv?.message || 'error'}</p>}
                    </Box>

                    <Input
                        sx={{ mt: 2, color: 'var(--color-light)' }}
                        {...register('amount', {
                            required: 'requierd',
                        })}
                        name='amount'
                        type='number'
                        placeholder='Amount'
                    />
                    <Box sx={{
                        mt: 1,
                        color: 'var(--color-error)'
                    }}>
                        {errors?.amount && <p>{errors?.amount?.message || 'error'}</p>}
                    </Box>

                    <Button
                        className='btn-gradient'
                        type='submit'
                        sx={{
                            mt: 1,
                            color: 'var(--color-light)'
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </div>
    )
}

export default Index;