import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false, name: 'user_name', length: 255 })
    userName: string;

    @Column({ nullable: false, length: 255 })
    position: string

    @Column({ nullable: false, name: 'user_text', length: 1000 })
    userText: string
}
