import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from '@material-ui/core';
import { Tool } from '@prisma/client';
import React, { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import restEndpoints from '../../lib/restEndpoints';

interface Props {
    open: boolean;
    onClose: () => void;
}

export type ToolForm = Omit<Tool, 'id'>;

export default function ToolDialog({ open, onClose }: Props): ReactElement {
    const { handleSubmit, reset, control } = useForm<ToolForm>({
        defaultValues: {
            name: '',
            description: '',
            image: '',
            link: '',
        },
    });

    const onSubmit = async (values: ToolForm) => {
        const { name, description, image, link } = values;
        const response = await fetch(restEndpoints.tools, {
            body: JSON.stringify({ name, description, image, link }),
            method: 'POST',
        });
        if (response) {
            const data: Tool = await response.json();
            if (data.id) {
                mutate(restEndpoints.tools);
                onClose();
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{`Create Tool`}</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container alignItems="center" justifyContent="center" direction="column">
                        <Grid item xs={12} style={{ margin: '0 0 1em 0' }}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Tool Name"
                                        variant="outlined"
                                        required
                                        margin="dense"
                                        autoFocus={true}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={4}
                                        multiline
                                        variant="outlined"
                                        label="Tool Description"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        variant="outlined"
                                        label="Tool image link"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="link"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        variant="outlined"
                                        label="Tool website"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="default" variant="contained">
                        CANCEL
                    </Button>
                    <Button onClick={() => reset()} type="reset" color="secondary" variant="contained">
                        RESET
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        SUBMIT
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
