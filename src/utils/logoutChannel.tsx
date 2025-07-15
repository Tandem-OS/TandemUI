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
    console.log("[BroadcastChannel] Sent LOGOUT");
  } catch (err) {
    console.error("Failed to broadcast logout", err);
  }
}
