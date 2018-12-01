import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import avatar from "assets/img/faces/marc.jpg";

class UserProfile extends React.Component {
    render() {

    const { classes } = this.props;
        return (
            <Card profile>
                <CardAvatar profile>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={avatar} alt="..." />
                    </a>
                </CardAvatar>
                <CardBody profile>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography className={classes.username}>Lương Kiên Hào</Typography>
                            <Typography className={classes.usercategory}>Quản lý</Typography>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 10, width: '100%' }}>
                                <Typography className={classes.userInfoLabel}>Ngày sinh</Typography>
                                <Typography className={classes.userdob}>1/1/1996</Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, width: '100%' }}>
                                <Typography className={classes.userInfoLabel}>Số điện thoại</Typography>
                                <Typography className={classes.userphone}>0912345678</Typography>
                            </div>
                        </div>
                    </div>
                    {/* <Button color="primary" round style={{marginTop: 20}}>
                        Follow
                    </Button> */}
                </CardBody>
            </Card>
        );
    }
}


const styles = {
    username: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
    },
    usercategory: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
    },
    userInfoLabel: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    userdob: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
    },
    userphone: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
    },
};

export default withStyles(styles)(UserProfile);
