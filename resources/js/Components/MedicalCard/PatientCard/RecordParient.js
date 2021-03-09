import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
        marginBottom:35
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Информация о карте</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Номер медкарты:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    123
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Статус:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    Повторный
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Начальный остаток:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="8 040 Р " variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Сумма лечения:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="8 040 Р " variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Первый приём:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    12.12.2020
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Персональная информация</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Фамилия:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Александров" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Имя:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Александр" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Отчество:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Александрович" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Дата рождения:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/*{props.props.Patient[0].birthday}*/}
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Пол:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/*{props.props.Patient[0].gender}*/}
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Представитель:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Иванова" variant="outlined" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Полисы</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={3} className="patient_card_title">
                                    PECO:
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    ДМС на лечение и удаление
                                </Grid>
                                <Grid item xs={12} sm={3} className="patient_card_title">
                                    с 10.09.2020
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    до 10.09.2020
                                </Grid>
                                <Grid item xs={12} sm={3} className="patient_card_title">
                                    Уралсиб:
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    ДМС на лечение
                                </Grid>
                                <Grid item xs={12} sm={3} className="patient_card_title">
                                    с 10.09.2020
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    до 10.09.2020
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Контактная информация</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Телефон:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="+7 (123) 456-78-90" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    СМС-рассылка:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    Отказ
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Email:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="vova@kremlin.com" variant="outlined" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Адрес проживания</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Город:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Краснодар" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Улица:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Красная" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={4} className="patient_card_title">
                                    Дом: <TextField label="23" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    Корпус:<TextField label="2" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={4} className="patient_card_title">
                                    Квартира: <TextField label="23" variant="outlined" />
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Маркетинг</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Узнал о нас:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    Из интернета
                                </Grid>
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Причина перемещения в архив:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    Недовольство качеством
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className="title_card">Прочее</div>
                            <Grid container className="patient_card_info">
                                <Grid item xs={12} sm={6} className="patient_card_title">
                                    Комментарий:
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    епкпекпекпекпкеппапмкпмекп епекпепек пеекпке
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
