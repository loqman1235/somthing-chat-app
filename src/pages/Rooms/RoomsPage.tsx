import { MainMenu } from "@/components/MainMenu";
import { RoomCard, SkeletonRoomCard } from "@/components/RoomCard";
import Button from "@/components/shared/Button";
import useAuth from "@/hooks/useAuth";

// Icons
import { MdAdd } from "react-icons/md";
import { Modal } from "@/components/shared/Modal";
import { useEffect, useState } from "react";
import CreateRoomForm from "@/components/Forms/CreateRoomForm";
import useRoom from "@/hooks/useRoom";
import useSocket from "@/hooks/useSocket";

const RoomsPage = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const { rooms, isLoading, error, setRooms } = useRoom();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = ({
      roomId,
      totalMembers,
    }: {
      roomId: string;
      totalMembers: number;
    }) => {
      console.log(roomId, totalMembers);

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, totalMembers } : room,
        ),
      );
    };

    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("online_users", handleOnlineUsers);
    };
  }, [socket, setRooms]);

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background p-2 py-5 md:p-5">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold text-text-foreground">Rooms</h3>

          {user && user.role === "ADMIN" && (
            <Button variant="primary" type="button" onClick={handleModal}>
              <MdAdd className="text-xl" /> Create
            </Button>
          )}
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 ">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRoomCard key={i} />
            ))}

          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                totalMembers={room.totalMembers || 0}
              />
            ))
          ) : (
            <div className="w-full  text-text-muted">{error && error}</div>
          )}
        </div>
      </div>

      {/* Create room modal */}
      <Modal
        title="Create room"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CreateRoomForm />
      </Modal>
    </main>
  );
};

export default RoomsPage;
