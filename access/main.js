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

