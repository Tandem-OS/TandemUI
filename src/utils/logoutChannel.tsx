const CHANNEL_NAME = 'logout_channel';

let channel: BroadcastChannel;

export function getLogoutChannel() {
  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
  return channel;
}

export function broadcastLogout() {
  try {
    const logoutChannel = getLogoutChannel();
    logoutChannel.postMessage("LOGOUT");
  } catch  {
      // BroadcastChannel not supported in this browser — logout proceeds locally, tab sync unavailable
  }
}
