'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '@repo/ui/Navbar';
import AddBtn from '@repo/ui/AddBtn';
import StatusCard from '@repo/ui/StatusCard';
import Message from '@repo/ui/Message';
import Send from '@repo/ui/Send';
import { IoIosSearch } from 'react-icons/io';
import { TypeClient } from '@repo/ui/Message';
import { UserType, Message as message } from '@repo/types/types';
import WelcomeScreen from './WelcomeScreen';
import { signOut, useSession } from 'next-auth/react';
import Getimg from '../_hooks/Getimg';
import { userFollowings } from '../../actions/UserFollwers';
import LeftDrawers from './LeftDrawers';
import { RegisterMessage, ChatMessage } from '@repo/types/types';
const HomePage = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<message[]>([]);
  const [newConnection, SetnewConnection] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [Drawer, setDrawer] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  const fetchUserFollowers = useCallback(async () => {
    if (session?.user.id) {
      try {
        const followers = await userFollowings(session.user.id);
        // Handle followers data
        const Following = followers.followers;
        if (Following === undefined) {
          return;
        }
        setUsers(JSON.parse(JSON.stringify(Following)));
        console.log(users);
      } catch (error) {
        console.log('Error fetching user followers:', error);
      }
    }
  }, [session]);
  const connectWebSocket = useCallback(
    (id: string) => {
      const socket = new WebSocket(
        process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
      );

      socket.onopen = () => {
        console.log('Connected to WebSocket');
        if (session?.user.id) {
          const registerMessage: RegisterMessage = {
            type: 'register',
            to: session?.user.id,
            from: id,
          };
          socket.send(JSON.stringify(registerMessage));
        }
      };

      setWs(socket);
    },
    [session?.user.id]
  );

  const Images = Getimg();
  const handleSendMessage = useCallback(() => {
    if (
      ws &&
      ws.readyState === WebSocket.OPEN &&
      message.trim() &&
      newConnection &&
      session?.user.id
    ) {
      const chatMessage: ChatMessage = {
        type: 'message',
        from: newConnection.id,
        to: session.user.id,
        content: message,
      };
      ws.send(JSON.stringify(chatMessage));

      // Optimistically add the message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: TypeClient.USER, id: session.user.id, message: message },
      ]);

      // Clear the input field
      setMessage('');
    } else if (ws && ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not open. Cannot send message.');
    }
  }, [ws, message, newConnection, session?.user.id]);

  const disconnectWebSocket = useCallback(() => {
    if (ws) {
      ws.close(); // Close the WebSocket connection
      setWs(null); // Clear the WebSocket state
      console.log('WebSocket connection closed.');
    }
  }, [ws]);

  const BuildConnection = useCallback(
    (user: UserType) => {
      if (newConnection !== null) {
        console.log('closed');
        if (ws) disconnectWebSocket();
      }
      console.log(user);
      SetnewConnection(user); // Update the connection first
      connectWebSocket(user.id);
      const filteredMessages = messages.filter(
        (msg) => msg.id === user.id || msg.id === session?.user.id
      );
      setMessages(filteredMessages);
    },
    [
      messages,
      session?.user.id,
      newConnection,
      ws,
      disconnectWebSocket,
      connectWebSocket,
    ]
  );

  const handleTypeDrawer = (type: string) => {
    setDrawer(type);
    console.log(`Drawer updated to: ${type}`);
  };
  useEffect(() => {
    fetchUserFollowers();
  }, [fetchUserFollowers]);
  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data) as ChatMessage;
        console.log('Message received:', receivedMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type:
              receivedMessage.from === session?.user.id
                ? TypeClient.USER
                : TypeClient.CLIENT,
            id: receivedMessage.to,
            message: receivedMessage.content,
          },
        ]);
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }, [handleSendMessage, BuildConnection]);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-800">
      <div className="Left flex h-full w-[30%] flex-col border-r-[1.5px] border-r-white bg-BlackRussian">
        <Navbar
          onclick={{
            User: () => handleTypeDrawer('user'),
            notification: () => handleTypeDrawer('notification'),
            more: () => handleTypeDrawer('more'),
          }}
          img={Images}
          className="h-[10%] bg-BlackRussian"
          name="Param"
          type={'USER'}
        />

        <div className="mt-2 flex h-[8%] items-center justify-center gap-5 bg-BlackRussian">
          <span className="flex w-[80%] items-center justify-between rounded-3xl bg-ShadowBlack px-4 py-2">
            <IoIosSearch
              style={{
                transform: 'scale(1.1)',
              }}
            />
            <input
              type="text"
              className="w-[100%] border-none bg-ShadowBlack text-white outline-none"
            />
          </span>
          <span>
            <AddBtn />
          </span>
        </div>
        <div className="section mt-3 flex items-center justify-evenly">
          <button onClick={() => signOut()} className="btn">
            Active Now
            <hr />
          </button>
          <button className="btn">
            Favourate
            <hr />
          </button>
          <button className="btn">
            All
            <hr />
          </button>
        </div>
        <div className="scrollable users mt-4 h-[80%] w-full overflow-auto">
          {users.length === 0
            ? 'You have no friends'
            : users.map((user, idx) => (
                <StatusCard
                  onClick={() => {
                    BuildConnection(user);
                  }}
                  key={idx}
                  name={user.name}
                  img={user.Image}
                />
              ))}
        </div>
      </div>
      <div className="right h-full w-[70%] bg-yellow-300">
        {newConnection && newConnection?.name && (
          <Navbar
            img={newConnection.Image}
            className="h-[10%] border-b-2 border-b-white bg-EerieBlack"
            name={newConnection?.name}
            type={'FOLLOWER'}
          />
        )}
        {!newConnection && <WelcomeScreen />}
        <div className="flex h-[75%] w-full flex-col overflow-auto bg-EerieBlack pt-2">
          {messages.map((msg, index) => (
            <Message
              className="mt-2"
              key={index}
              message={msg.message}
              type={msg.type}
            />
          ))}
        </div>
        <Send
          onClick={handleSendMessage}
          message={message}
          setMessage={setMessage}
          className="bg-EerieBlack pb-4"
        />
      </div>
      <LeftDrawers Drawer={Drawer} setDrawer={setDrawer} />
    </div>
  );
};

export default HomePage;
