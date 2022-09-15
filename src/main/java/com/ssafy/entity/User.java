package com.ssafy.entity;

import javax.persistence.*;

/*@DynamicUpdate
@Entity
@Table(name = "USER_TB")
@Data
@NamedNativeQuery(
		name="user_rank",
		query="select USER_UID, USER_NICKNAME, USER_CPOINT, rank() over(order by USER_CPOINT desc) as ranking from USER_TB",
		resultSetMapping="user_rank_dto")
@SqlResultSetMapping(
		name="user_rank_dto",
		classes = @ConstructorResult(
				targetClass = UserRankDto.class,
				columns= {
					@ColumnResult(name="USER_UID", type=String.class),
					@ColumnResult(name="USER_NICKNAME", type=String.class),
					@ColumnResult(name="USER_CPOINT", type=Integer.class),
					@ColumnResult(name="ranking", type=Integer.class)
				}
		)
)*/
public class User {

	 //pk, 유저 uid
	   @Id
	   @Column(name="USER_UID")
	   //@Notnull어노테이션으로처리가 가능하다.... 업데이트부분이...
	   private String userUid;

}
