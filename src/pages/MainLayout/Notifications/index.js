import * as React from "react";
import { styled } from "@mui/material/styles";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import MuiPaper from "@mui/material/Paper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiDivider from "@mui/material/Divider";

async function fetchNotifications() {
  return [
    {
      id: 68,
      title: "<b>Check out Base UI today</b> 💥",
      text: 'Love Material UI, but don\'t need Material Design? Try Base UI, the new "unstyled" alternative. <a style="color: inherit;" data-ga-event-category="Blog" data-ga-event-action="notification" data-ga-event-label="introducing-base-ui" href="/blog/introducing-base-ui/">Read more in this announcement</a>.',
    },
    {
      id: 76,
      title: "<b>Unveiling Charts: Alpha release is live</b>",
      text: 'We\'re starting with bars, lines, and scatter charts. <a style="color: inherit;" data-ga-event-category="Announcement" data-ga-event-action="notification" data-ga-event-label="mui-x-introduce-charts" href="https://mui.com/x/react-charts/">Try X Charts now</a>, and let us know what you need.',
    },
    {
      id: 78,
      title:
        "<b>MUI X v6.18.x and the latest improvements before the next major</b>",
      text: 'New stable components, polished features, better performance and more. Check out the details in our <a style="color: inherit;" data-ga-event-category="Announcement" data-ga-event-action="notification" data-ga-event-label="mui-x-end-v6" href="https://mui.com/blog/mui-x-end-v6-features/">recent blog post</a>.',
    },
    {
      id: 79,
      title: "<b>Influence the roadmap for 2024</b>",
      text: 'Take a few minutes to share your feedback and expectations in the <a style="color: inherit;" data-ga-event-category="Announcement" data-ga-event-action="notification" data-ga-event-label="mui-survey" href="https://tally.so/r/3Ex4PN?source=docs-notification">Developer Survey</a>.',
    },
  ];
}

const Paper = styled(MuiPaper)({
  transformOrigin: "top right",
  backgroundImage: "none",
});

const List = styled(MuiList)(({ theme }) => ({
  width: theme.spacing(40),
  maxHeight: 540,
  overflow: "auto",
  padding: theme.spacing(1, 0),
}));

const ListItem = styled(MuiListItem)({
  display: "flex",
  flexDirection: "column",
});

const Loading = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(3, 0),
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

function getCookie(name) {
  if (typeof document === "undefined") {
    throw new Error(
      "getCookie() is not supported on the server. Fallback to a different value when rendering on the server."
    );
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts[1].split(";").shift();
  }

  return undefined;
}

export default function Notifications() {
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [{ lastSeen, messages }, setNotifications] = React.useState({
    lastSeen: undefined,
    messages: undefined,
  });

  const messageList = messages
    ? messages.reverse()
    : null;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setTooltipOpen(false);

    if (messageList && messageList.length > 0) {
      const newLastSeen = messageList[0].id;
      setNotifications((notifications) => {
        if (newLastSeen !== notifications.lastSeen) {
          return {
            messages: notifications.messages,
            lastSeen: newLastSeen,
          };
        }
        return notifications;
      });
      document.cookie = `lastSeenNotification=${newLastSeen};path=/;max-age=31536000`;
    }
  };

  React.useEffect(() => {
    let active = true;

    // Prevent search engines from indexing the notification.
    if (/glebot/.test(navigator.userAgent) || messages) {
      return undefined;
    }

    // Soften the pressure on the main thread
    // and create some distraction.
    const timeout = setTimeout(async () => {
      const notifications = await fetchNotifications().catch(() => {
        // Swallow the exceptions, e.g. rate limit
        return [];
      });

      if (active) {
        // Permanent notifications

        const seen = getCookie("lastSeenNotification");
        const lastSeenNotification =
          seen === undefined ? 0 : parseInt(seen, 10);
        setNotifications({
          messages: notifications,
          lastSeen: lastSeenNotification,
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
      active = false;
    };
  }, [messages]);

  return (
    <React.Fragment>
      <Tooltip
        open={tooltipOpen}
        title={"Toggle Notifications"}
        enterDelay={300}
        onOpen={() => {
          setTooltipOpen(!open);
        }}
        onClose={() => {
          setTooltipOpen(false);
        }}
      >
        <IconButton
          color="inherit"
          ref={anchorRef}
          aria-controls={open ? "notifications-popup" : undefined}
          aria-haspopup="true"
          aria-label={`${
            messageList
              ? messageList.reduce(
                  (count, message) =>
                    message.id > lastSeen ? count + 1 : count,
                  0
                )
              : 0
          } ${"unreadNotifications"}`}
          data-ga-event-category="AppBar"
          data-ga-event-action="toggleNotifications"
          onClick={handleToggle}          
        >
          <Badge
            color="error"
            badgeContent={
                messageList
                ? messageList.reduce(
                    (count, message) =>
                      message.id > lastSeen ? count + 1 : count,
                    0
                  )
                : 0
            }
          >
            <NotificationsNoneRoundedIcon fontSize="medium" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popper
        id="notifications-popup"
        anchorEl={anchorRef.current}
        open={open}
        placement="bottom-end"
        transition
        disablePortal
        role={undefined}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
            }}
          >
            <Grow in={open} {...TransitionProps}>
              <Paper
                sx={() => ({
                  mt: 0.5,
                  border: "1px solid",
                  borderColor: "grey.200",
                  boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`
                })}
              >
                <List>
                  {messageList ? (
                    messageList.map((message, index) => (
                      <React.Fragment key={message.id}>
                        <ListItem alignItems="flex-start">
                          <Typography gutterBottom>
                            <span
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: message.title,
                              }}
                            />
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            <span
                              id="notification-message"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                          </Typography>
                          {message.date && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(message.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </Typography>
                          )}
                        </ListItem>
                        {index < messageList.length - 1 ? <Divider /> : null}
                      </React.Fragment>
                    ))
                  ) : (
                    <Loading>
                      <CircularProgress size={32} />
                    </Loading>
                  )}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
}
