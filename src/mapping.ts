import { BigInt } from "@graphprotocol/graph-ts";
import {
  Messaging,
  MessageSent,
  ThreadCreated,
} from "../generated/Messaging/Messaging";
import { Message, Thread } from "../generated/schema";

export function handleMessageSent(eventOne: MessageSent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entityOne = Message.load(
    eventOne.transaction.hash.toHex() + "-" + eventOne.logIndex.toString()
  );
  // let entityTwo = Thread.load(
  //   eventTwo.transaction.hash.toHex() + "-" + eventTwo.logIndex.toString()
  // );
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entityOne) {
    entityOne = new Message(
      eventOne.transaction.hash.toHex() + "-" + eventOne.logIndex.toString()
    );

    // EntityOne fields can be set using simple assignments
    // entityOne.messageCount = BigInt.fromI32(0);
  }
  // if (!entityTwo) {
  //   entityTwo = new Thread(
  //     eventTwo.transaction.hash.toHex() + "-" + eventTwo.logIndex.toString()
  //   );
  // }

  // BigInt and BigDecimal math are supported
  // entityOne.messageCount = entityOne.messageCount + BigInt.fromI32(1);

  // EntityOne fields can be set based on eventOne parameters
  // entityOne.msg_id = eventOne.params.msg_id;

  entityOne._receiver = eventOne.params.receiver.toHexString();
  entityOne._uri = eventOne.params.uri;
  entityOne._timestamp = eventOne.params.timestamp;
  entityOne._sender = eventOne.params.sender.toHexString();
  entityOne._thread_id = eventOne.params.thread_id;
  entityOne.save();

  // entityTwo._receiver = eventTwo.params.receiver;
  // entityTwo._sender = eventTwo.params.sender;
  // entityTwo._thread_id = eventTwo.params.thread_id;
  // entityTwo._timestamp = eventTwo.params.timestamp;
  // entityTwo.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entityOne from the store. Instead, create it fresh with
  // `new EntityOne(...)`, set the fields that should be updated and save the
  // entityOne back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the eventOne can be connected to
  // with:
  //
  // let contract = Contract.bind(eventOne.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allMessages(...)
  // - contract.messageCount(...)
  // - contract.messageURI(...)
  // - contract.messages(...)
  // - contract.receiverToMessages(...)
}

export function handleThreadCreated(eventTwo: ThreadCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  let entityTwo = Thread.load(
    eventTwo.transaction.hash.toHex() + "-" + eventTwo.logIndex.toString()
  );
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand

  // EntityOne fields can be set using simple assignments
  // entityOne.messageCount = BigInt.fromI32(0);

  if (!entityTwo) {
    entityTwo = new Thread(
      eventTwo.transaction.hash.toHex() + "-" + eventTwo.logIndex.toString()
    );
  }

  // BigInt and BigDecimal math are supported
  // entityOne.messageCount = entityOne.messageCount + BigInt.fromI32(1);

  // EntityOne fields can be set based on eventOne parameters
  // entityOne.msg_id = eventOne.params.msg_id;

  entityTwo._receiver = eventTwo.params.receiver;
  entityTwo._sender = eventTwo.params.sender;
  entityTwo._thread_id = eventTwo.params.thread_id;
  entityTwo._timestamp = eventTwo.params.timestamp;
  entityTwo._sender_key = eventTwo.params._sender_key;
  entityTwo._receiver_key = eventTwo.params._receiver_key;
  entityTwo.encrypted = eventTwo.params._encrypted;
  entityTwo.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entityOne from the store. Instead, create it fresh with
  // `new EntityOne(...)`, set the fields that should be updated and save the
  // entityOne back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the eventOne can be connected to
  // with:
  //
  // let contract = Contract.bind(eventOne.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allMessages(...)
  // - contract.messageCount(...)
  // - contract.messageURI(...)
  // - contract.messages(...)
  // - contract.receiverToMessages(...)
}
