'use client'

import '@stream-io/video-react-sdk/dist/css/styles.css';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';
import { auth } from '@clerk/nextjs'
import { useEffect, useState } from 'react';
import { generateToken } from '@/lib/actions/general.action';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const VideoCall = ({ roomId }: { roomId: string }) => {

    // const { userId: clerkId } = auth()
    const clerkId = '12345'
    const user: User = {
        id: clerkId,
        name: 'Clerk User' ?? undefined,
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' ?? undefined,
    };

    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [hideList, setHideList] = useState(false);

    const router = useRouter()

    useEffect(() => {

        if (!clerkId) return

        let client: any

        if (apiKey) {
            const client = new StreamVideoClient({
                apiKey,
                user,
                tokenProvider: () => generateToken(),
                // token,
            });
            setClient(client);

            const call = client.call('default', roomId);
            call.join({ create: true });
            setCall(call);

            return () => {
                call.leave()
                    .then(() => {
                        client?.disconnectUser();
                    })
                    .catch(console.error);
            }
        }

    }, [clerkId])

    return (
        client && call && (
            <StreamVideo client={client}>
                <StreamTheme>
                    <StreamCall call={call}>
                        <SpeakerLayout />
                        <CallControls
                            onLeave={() => router.push('/rooms')}
                        />
                        {hideList ? (
                            <Button
                                className='primary-gradient w-fit !text-light-900'
                                onClick={() => setHideList(false)}
                            >
                                Show List
                            </Button>
                        ) : (<CallParticipantsList
                            onClose={() => setHideList(true)}
                        />)}
                    </StreamCall>
                </StreamTheme>
            </StreamVideo>
        )
    );
};