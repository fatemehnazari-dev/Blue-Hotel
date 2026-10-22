class Room {
  constructor(price, number, type) {
    this.id = Room.generateId();
    this.price = price;
    this.number = number;
    this.type = type;
  }
  static generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}

class Reservation {
  constructor(guestName, guestPhone, roomId, checkIn, checkOut) {
    this.reservationId = Reservation.generateId();
    this.guestName = guestName;
    this.guestPhone = guestPhone;
    this.roomId = roomId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }
  static generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
  overlaps(newCheckIn, newCheckOut) {
    return (
      (newCheckIn >= this.checkIn && newCheckIn <= this.checkOut) || //تاریخ ورود رزرو جدید داخل بازه رزرو قبلی نباشد
      (newCheckOut >= this.checkIn && newCheckOut <= this.checkOut) || //تاریخ خروج رزرو جدید داخل بازه رزرو قبلی نباشد
      (newCheckIn <= this.checkIn && newCheckOut >= this.checkOut) //بازه رزرو جدید بازه رزرو قبلی را پوشش ندهد
    );
  }
}

class Hotel {
  constructor() {
    this.rooms = [];
    this.reservations = [];
  }

  addRoom(number, type, price) {
    const isExistRoom = this.rooms.some((item) => {
      return item.number == number;
    });
    if (isExistRoom) {
      //درس صورت تطابق داشتن این دو عدد
      throw new Error("This room currently exists.");
    }
    const room = new Room(price, number, type);
    this.rooms.push(room);
    this.save();
  }

  save() {
    localStorage.setItem("rooms", JSON.stringify(this.rooms));
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  load() {
    const roomsData = localStorage.getItem("rooms");
    if (roomsData) {
      this.rooms = JSON.parse(roomsData).map((item) => {
        const room = new Room(item.price, item.number, item.type);
        room.id = item.id;
        return room;
      });
    }

    //Reservation
    const reservationsData = localStorage.getItem("reservations");
    if (reservationsData) {
      this.reservations = JSON.parse(reservationsData).map((item) => {
        const reservation = new Reservation(
          item.guestName,
          item.guestPhone,
          item.roomId,
          item.checkIn,
          item.checkOut,
        );
        reservation.reservationId = item.reservationId;
        return reservation;
      });
    }
  }

  addReservation(guestName, guestPhone, roomId, checkIn, checkOut) {
    const reservation = new Reservation(
      guestName,
      guestPhone,
      roomId,
      checkIn,
      checkOut,
    );
    this.reservations.push(reservation);
    this.save();
    return reservation;
  }
}
