function head()
{
  var resolution = 5; // increase to get smoother corners (will get slow!)
  
  //mouth
  var cubeMouth_1 = CSG.roundedCube({center: [4, 0, 0], radius: [4,7,4], roundradius: 1, resolution: resolution});
  cubeMouth_1 = cubeMouth_1.expand(0.1, 8);
  var cubeMouth_2 = CSG.roundedCube({center: [6, 0, 0], radius: [8,7,4], roundradius: 1, resolution: resolution});
  var cubeMouth_plane = cubeMouth_2.cutByPlane(CSG.Plane.fromNormalAndPoint([1, 0, 2], [15, 0, 0]));
  var cubeMouth_plane1 = cubeMouth_plane.cutByPlane(CSG.Plane.fromNormalAndPoint([-1, 2, 0], [22, 0, 0]).flipped());
  var cubeMouth_plane2 = cubeMouth_plane1.cutByPlane(CSG.Plane.fromNormalAndPoint([1, 2, 0], [22, 0, 0]));
  cubeMouth_plane2 = cubeMouth_plane2.expand(0.1, 8);
  var cubeMouth_3 = CSG.roundedCube({center: [16, 0, -1.8], radius: [4,4,2.5], roundradius: 1, resolution: resolution});
  
  var cubeMouth_4 = CSG.roundedCube({center: [9, 0, -7], radius: [10,7,3], roundradius: 1, resolution: resolution});
  var cubeMouth_plane3 = cubeMouth_4.cutByPlane(CSG.Plane.fromNormalAndPoint([0, 0, 1], [0, 0, -5]));
  var cubeMouth_plane4 = cubeMouth_plane3.cutByPlane(CSG.Plane.fromNormalAndPoint([1, 0, -15], [0, 0, -7]));
  var cubeMouth_plane5 = cubeMouth_plane4.cutByPlane(CSG.Plane.fromNormalAndPoint([1, 5, 0], [0, 8, 0]));
  var cubeMouth_plane6 = cubeMouth_plane5.cutByPlane(CSG.Plane.fromNormalAndPoint([1, -5, 0], [0, -8, 0]));
  
  //neck
  var cubeBack = CSG.roundedCube({center: [0, 0, -2], radius: [4,7,6], roundradius: 1, resolution: resolution});
  var cubeBack_plane1 = cubeBack.cutByPlane(CSG.Plane.fromNormalAndPoint([-5, 0, -1], [-3, 0, 0]));
  var cubeBack_plane2 = cubeBack_plane1.cutByPlane(CSG.Plane.fromNormalAndPoint([0, 0, -1], [0, 0, -7]));
  
  //bones
  var sphere1 = CSG.sphere({center: [-10, -14, 10], radius: 1, resolution: 20});
  var sphere2 = sphere1.union(CSG.sphere({center: [-7, -7, 2], radius: 1, resolution: 20}));
  var sphere3 = sphere2.union(CSG.sphere({center: [-8, -15, 5], radius: 1, resolution: 20}));
  var cylinder1 = sphere3.union(CSG.cylinder({start: [2, -6, 3], end: [-6, -12, 7], radius: 1, resolution: 20}));
  var cylinder2 = cylinder1.union(CSG.cylinder({start: [-6, -12, 7], end: [-10, -14, 10], radius: 1, resolution: 20}));
  var cylinder3 = cylinder2.union(CSG.cylinder({start: [-3, -9, 5], end: [-7, -7, 2], radius: 1, resolution: 20}));
  var cylinder4 = cylinder3.union(CSG.cylinder({start: [-6, -12, 7], end: [-8, -15, 5], radius: 1, resolution: 20}));
  
  var mirror_cylinder4 = cylinder4.mirroredY();
  
  //beard
  var cylinderBeard1 = CSG.cylinder({start: [18, -2, 0], end: [19, -3, 1], radius: 0.3, resolution: 20});
  var cylinderBeard2 = cylinderBeard1.union(beardGrow(19, -3, 1, 0, -0.7, 0, 0.3));
  var cylinderBeard3 = cylinderBeard2.union(beardGrow(19, -3.7, 1, -0.5, -0.3, -0.5, 0.2));
  var cylinderBeard4 = cylinderBeard3.union(beardGrow(18.5, -4, 0.5, -0.5, -0.3, -0.5, 0.2));
  var cylinderBeard5 = cylinderBeard4.union(beardGrow(18, -4.3, 0, -1, -1, -1, 0.2));
  var cylinderBeard6 = cylinderBeard5.union(beardGrow(17, -5.3, -1, -3, -2, -1, 0.2));
  var cylinderBeard7 = cylinderBeard6.union(beardGrow(14, -7.3, -2, -5, -1, -1, 0.1));
  var cylinderBeard8 = cylinderBeard7.union(beardGrow(9, -8.3, -3, -7, 0, 0.2, 0.1));
  var cylinderBeard9 = cylinderBeard8.union(beardGrow(2, -8.3, -2.8, -7, 0, -0.6, 0.1));
  
  var mirror_beard = cylinderBeard9.union(cylinderBeard9.mirroredY());
  
  //hair
  var hair1 = CSG.cylinder({start: [-3, 8, 4], end: [-3, -8, 4], radius: 4, resolution: 3}).rotateY(-10);
  var hair2 = hair1.union(CSG.cylinder({start: [-3, 9, -2], end: [-3, -9, -2], radius: 4, resolution: 3}).rotateY(45).scale([1.7, 1, 1]));
  var hair3 = hair2.union(CSG.cylinder({start: [1, 8, -5], end: [1, -8, -5], radius: 4, resolution: 3}).rotateY(30).scale([1.5, 1, 1]));
  var hair4 = hair3.union(CSG.cylinder({start: [1, 7, -7], end: [1, -7, -7], radius: 4, resolution: 3}).scale([1, 1, 1]));
  var hair5 = hair4.union(CSG.cylinder({start: [1, 6, -8], end: [1, -6, -8], radius: 2, resolution: 3}).rotateY(-20).scale([1.5, 1, 1]));
  var hair6 = hair5.union(CSG.cylinder({start: [6, 5, -7], end: [6, -5, -7], radius: 1, resolution: 3}).rotateY(-20).scale([1.5, 1, 1.5]));
  var hair7 = hair6.union(CSG.cylinder({start: [12, 4, -14], end: [12, -4, -14], radius: 1, resolution: 3}).rotateY(-30).scale([1, 1, 1]));
  
  var result = cubeMouth_1;
  result = result.union(cubeMouth_plane2);
  result = result.union(cubeMouth_3);
  result = result.union(cubeMouth_plane6);
  result = result.union(cubeBack_plane2);
  result = result.union(cylinder4);
  result = result.union(mirror_cylinder4);
  result = result.union(mirror_beard);
  result = result.union(hair7);
  return result.scale(1);
}

function beardGrow(p1, p2, p3, p4, p5, p6, p7){
    return CSG.cylinder({start: [p1,p2,p3], end: [p1+p4, p2+p5, p3+p6], radius: p7, resolution: 20});
}














function body() {
    c1 = cylinder({h: 20, r1: 5 , r2: 5,center: true, fn:50, roundRadius: 0.5});
    c2 = rotate([90,0,0],c1);
    c3 = cylinder({h: 20, r1: 5 , r2: 7,center: true, fn:50});
    
    radius = 5;
    origin = sphere({r:radius, center: true});
    
    s1 = translate([0, radius/2 * 1.2, 0], sphere({r:radius, center: true}));
    s2 = translate([0, -radius/2 * 1.2, 0], sphere({r:radius, center: true}));
    s3 = translate([radius/4 * 2 ,0, radius/6], sphere({r:radius, center: true}));
    //s3 = translate([3 ,0,0], cube({size: [radius*2, radius*2 , radius*2], center: true}));
    s4 = translate([0 ,0,-radius], cube({size: [radius * 2, radius , radius], center: true}));
    
    
    inter_1 = translate([0,-10, 3],rotate([0,30,90], difference(difference(intersection(s1,s2), s3), s4)));
    inter_2 = translate([0,radius/4* 2, 0], inter_1);
    inter_3 = translate([0,radius/4* 2, 0], inter_2);
    inter_4 = translate([0,radius/4* 2, 0], inter_3);
    inter_5 = translate([0,radius/4* 2, 0], inter_4);
    inter_6 = translate([0,radius/4* 2, 0], inter_5);
    inter_7 = translate([0,radius/4* 2, 0], inter_6);
    
    cs1 = circle({r: 6, fn: 4, center: true});
    cs2 = rotate([0,0,45], circle({r: 6, fn: 4, center: true}));
    cs3 = intersection(cs1, cs2);
    
    c4 = CSG.cylinder({start: [0, 0, 0], end: [7, -7, 3], radius: 1, resolution: 20});
    
    result = union(
        translate([0, -10, 0], sphere({r:4.5, center: true })),
        //c2,
        translate([0, 10, 0], sphere({r:4.5, center: true })),
        
        translate([0, radius, 0], inter_1),
        translate([0, radius, 0], inter_2),
        translate([0, radius, 0], inter_3),
        translate([0, radius, 0], inter_4),
        translate([0, radius, 0], inter_5),
        translate([0, radius, 0], inter_6),
        translate([0, radius, 0], inter_7),
        
        
        rotate([90,0,0], 
            linear_extrude(
                {height: 20, twist: -180, slices : 100, center: true}, 
                cs3
                )
            ),
        
        rotate([90,0,0], 
            linear_extrude(
                {height: 20, twist: 180, slices : 100, center: true}, 
                cs3
                )
            )
        
        
        
        
        );
    return result;
}














function claw () {

    //sphere({r: 1, center: true}),
    //var hair1 = CSG.cylinder({start: [-3, 8, 4], end: [-3, -8, 4], radius: 4, resolution: 3}).rotateY(-1);
    var f1 = CSG.cylinder({start: [0, 0, 0], end: [7, -7, 3], radius: 1, resolution: 20});
    var f2 = f1.union(CSG.cylinder({start: [0, 0, 0], end: [7, 7, 3], radius: 1, resolution: 20}));
    var f3 = f2.union(CSG.cylinder({start: [0, 0, 0], end: [9, 0, 3], radius: 1, resolution: 20}));
    var f11 = f3.union(
        CSG.cylinder({start: [9, 0, 3], end: [15, 0, 0], radius: 1, resolution: 20})
        );
    var f22 = f11.union(
        CSG.cylinder({start: [7, 7, 3], end: [10, 10, 0], radius: 1, resolution: 20})
        );
    var f33 = f22.union(
        CSG.cylinder({start: [7, -7, 3], end: [10, -10, 0], radius: 1, resolution: 20})
        );
    var f4 = f33.union(
        CSG.cylinder({start: [0, 0, 0], end: [-11, 0, 0], radius: 1, resolution: 20})
        );
    var b1 = CSG.cylinder({start: [0, 0, 0], end: [-10, 0, 10], radius: 1.5, resolution: 20});
    var b2 = b1.union(CSG.cylinder({start: [-10, 0, 10], end: [-15, 0, 19], radius: 1.5, resolution: 20}));
    
    var sphere1 = CSG.sphere({center: [0, 0, 0], radius: 3, resolution: 20});
    
    var s1 = CSG.sphere({center: [7, -7, 3], radius: 1, resolution: 20});
    var s2 = s1.union(CSG.sphere({center: [7, 7, 3], radius: 1, resolution: 20}));
    var s3 = s2.union(CSG.sphere({center: [9, 0, 3], radius: 1, resolution: 20}));
    var s4 = s3.union(CSG.sphere({center: [-10, 0, 10], radius: 1.7, resolution: 20}));
    
    var z1 = CSG.sphere({center: [15, 0, 0], radius: 2.7, resolution: 3})
    .translate([-15, 0, 0]) // 将球体移动到原点
    .scale([1.5, 0.7, 0.7]) // 在 Z 轴方向上拉长一倍
    .rotateY(25) // 绕 Z 轴旋转 -1 弧度
    .translate([15, 0, 0]); // 将球体移回原来的位置
    var z2 = z1.union(
    CSG.sphere({center: [10, 10, 0], radius: 1.3, resolution: 3})
    .translate([-10, -10, 0]) // 将第二个球体移动到原点
    .scale([1.2, 1.2, 3])
    .rotateX(50) // 绕 X 轴旋转 10 弧度
    .rotateY(0) // 绕 Y 轴旋转 20 弧度
    .rotateZ(-45) // 绕 Z 轴旋转 30 弧度
    .translate([10, 10, 0]) // 将第二个球体移回原来的位置
    );
    var z3 = z2.union(
    CSG.sphere({center: [10, -10, 0], radius: 1.3, resolution: 3})
    .translate([-10, 10, 0]) // 将第二个球体移动到原点
    .scale([1.2, 1.2, 3])
    .rotateX(-50) // 绕 X 轴旋转 10 弧度
    .rotateY(0) // 绕 Y 轴旋转 20 弧度
    .rotateZ(45) // 绕 Z 轴旋转 30 弧度
    .translate([10, -10, 0]) // 将第二个球体移回原来的位置
    );
    var z4 = z3.union(
    CSG.sphere({center: [-11, 0, 0], radius: 1.3, resolution: 3})
    .translate([11, 0, 0]) // 将第二个球体移动到原点
    .scale([2.7, 1.3, 1.2])
    .rotateX(0) // 绕 X 轴旋转 10 弧度
    .rotateY(-32) // 绕 Y 轴旋转 20 弧度
    .rotateZ(0) // 绕 Z 轴旋转 30 弧度
    .translate([-11, 0, 0]) // 将第二个球体移回原来的位置
    );

    j1 = CSG.cylinder({start: [0, 0, 0], end: [7/2.5, -7/2.5, 3/2.5], radius: 1.7, resolution: 20});
    j2 = j1.union(
        CSG.cylinder({start: [7/2, -7/2, 1.5], end: [7/1.4, -7/1.4, 3/1.4], radius: 1.7, resolution: 20})
    );
    j3 = j2.union(
        CSG.cylinder({start: [7/1.3, -7/1.3, 3/1.3], end: [7/1, -7/1, 3/1], radius: 1.7, resolution: 20})
    );
    j4 = j3.union(
        CSG.cylinder({start: [7+3/5, -7-3/5, 3-3/5], end: [7+3/1.9, -7-3/1.9, 3-3/1.9], radius: 1.7, resolution: 20})
    );
    j5 = j4.union(
        CSG.cylinder({start: [7+3/1.85, -7-3/1.85, 3-3/1.85], end: [7+3/1.1, -7-3/1.1, 3-3/1.1], radius: 1.7, resolution: 20})
    );
    var j6 = j5.union(
        j5.mirroredY()
        );
    j7 = j6.union(
        CSG.cylinder({start: [0, 0, 0], end: [9/2.5, 0, 3/2.5], radius: 1.7, resolution: 20})
        );
    j8 = j7.union(
        CSG.cylinder({start: [9/2, 0, 1.4], end: [9/1.4, 0, 3/1.4], radius: 1.7, resolution: 20})
    );
    j9 = j8.union(
        CSG.cylinder({start: [9/1.3, 0, 3/1.3], end: [9/1, 0, 3/1], radius: 1.7, resolution: 20})
    );
    j10 = j9.union(
        CSG.cylinder({start: [9+6/12, -0, 3-3/12], end: [9+6/2.3, 0, 3-3/2.3], radius: 1.7, resolution: 20})
    );
    j11 = j10.union(
        CSG.cylinder({start: [9+6/1.85, 0, 3-3/1.85], end: [9+6/1.1, 0, 3-3/1.1], radius: 1.7, resolution: 20})
    );
    j12 = j11.union(
        CSG.cylinder({start: [0, 0, 0], end: [-11/2, 0, 0], radius: 1.7, resolution: 20})
    );
    j13 = j12.union(
        CSG.cylinder({start: [-11/1.8, 0, 0], end: [-11/1.1, 0, 0], radius: 1.7, resolution: 20})
    );
    j14 = j13.union(
        CSG.cylinder({start: [0, 0, 0], end: [-10/2.7, 0, 10/2.7], radius: 2, resolution: 20})
    );
    j15 = j14.union(
        CSG.cylinder({start: [-10/2.4, 0, 10/2.4], end: [-10/1.5, 0, 10/1.5], radius: 2, resolution: 20})
    );
    j16 = j15.union(
        CSG.cylinder({start: [-10/1.4, 0, 10/1.4], end: [-10/1, 0, 10/1], radius: 2, resolution: 20})
    );
    j17 = j16.union(
        CSG.cylinder({start: [-10-5/17, 0, 10+9/17], end: [-10-5/3.4, 0, 10+9/3.4], radius: 2, resolution: 20})
    );
    j18 = j17.union(
        CSG.cylinder({start: [-10-5/3, 0, 10+9/3], end: [-10-5/1.7, 0, 10+9/1.7], radius: 2, resolution: 20})
    );
    j19 = j18.union(
        CSG.cylinder({start: [-10-5/1.6, 0, 10+9/1.6], end: [-10-5/1, 0, 10+9/1], radius: 2, resolution: 20})
    );
    
    var result = sphere1;
    result = result.union(f4);
    result = result.union(s4);
    result = result.union(z4);
    result = result.union(j19);
    result = result.union(b2);
  return result.scale(1);
}
}














function drangontail(params) {
	var sqrt3 = Math.sqrt(3) / 2;
	var radius = 10;

	var hex = CSG.Polygon.createFromPoints([
			[radius, 0, 0],
			[radius / 2, radius * sqrt3, 0],
			[-radius / 2, radius * sqrt3, 0],
			[-radius, 0, 0],
			[-radius / 2, -radius * sqrt3, 0],
			[radius / 2, -radius * sqrt3, 0]
	]).setColor(
		[0, 0.8, 0]
	);
	var angle = 5;
	
	m1 = hex.solidFromSlices({
		numslices: 720 / angle,
		callback: function(t, slice) {
			var coef = 1 - t * 0.8;
			m = this.rotateZ(5 * slice).scale(coef).translate([radius * 6 * t, t * 20, 10]).rotate(
						[0,20,0],
						[1, 0, 0],
						angle * slice
					);
    			return translate([0,20,-20], rotate([90,0,0], m ));
		    }
	        });
	

	
	m2 = translate([0,20,-20], rotate([90,0,0], m1 ));
	m3 = translate([0,20,-20], rotate([90,0,0], m2 ));
	m4 = translate([0,20,-20], rotate([90,0,0], m3 ));
	
	
	
	
	
	c1 = CSG.cylinderElliptic ({start: [0, 0, 0], end: [0, 10, 10], radiusStart: [3,5], radiusEnd: [2,4], resolution: 20, center: true});
	c2 = rotate([-20, 0, 0] , CSG.cylinderElliptic ({start: [0, 0, 0], end: [0, 10, 10], radiusStart: [2,4], radiusEnd: [1,3], resolution: 20, center: [0,0,0]}));
	c2 = translate([0,10,10] , c2);
	c3 = rotate([-20, 0, 0] , CSG.cylinderElliptic ({start: [0, 0, 0], end: [0, 10, 10], radiusStart: [1,3], radiusEnd: [0.7,2], resolution: 20, center: [0,0,0]}));
	c3 = translate([0,20,20] , c3);
	
	s1 = sphere({r:5, center: [0,0,0] });
	c4 = getTailPart([0,0,0], 15, 6,4, 35);
	c5 = getTailPart(c4[2], 7, 4, 3, 60);
	c6 = getTailPart(c5[2], 10, 3,2 , 70);
	c7 = getTailPart(c6[2], 10, 2 , 1.5, 50);
	c8 = getTailPart(c7[2], 6, 1.5, 1, 30);
	c9 = getTailPart(c8[2], 6, 1, 0.3, 40);
	
	part_side_1 = union(    
        c4[0],
        c4[1],
        c5[0],
        c5[1],
        c6[0],
        c6[1],
        c7[0],
        c7[1],
        c8[0],
        c8[1],
        c9[0]
	    );
    
    part_side_2 = rotate([0,0,5] , translate([0,4,0], part_side_1));
    tail1 = intersection(part_side_1, part_side_2);
    tail1 = translate([-3,-2,4], rotate([0,0,-3], tail1));
    
	c10 = getTailPart([-14,0,2], 10, 8,6 , 45);
	c11 = getTailPart(c10[2], 12, 6, 5.5, 55);
	c12 = getTailPart(c11[2], 10, 5.5, 5 , 60);
	c13 = getTailPart(c12[2], 8, 5.1 , 4, 50);
	c14 = getTailPart(c13[2], 10, 4, 3, 65);
	c15 = getTailPart(c14[2], 10, 3, 2, 75);
	c16 = getTailPart(c15[2], 6, 2, 1, 50);
	c17 = getTailPart(c16[2], 4, 1, 0.7, 30);
	c18 = getTailPart(c17[2], 4, 0.7, 0.3, 10);
	
	part_side_3 = union(    
        c10[0],
        c10[1],
        c11[0],
        c11[1],
        c12[0],
        c12[1],
        c13[0],
        c13[1],
        c14[0],
        c14[1],
        c15[0],
        c15[1],
        c16[0],
        c16[1],
        c17[0],
        c17[1],
        c18[0]
	    );
    
    part_side_4 = rotate([0,0,4] , translate([0,6,0], part_side_3));
    tail2 = intersection(part_side_3, part_side_4);
    tail2 = translate([0,-4,0], rotate([0,0,-3], tail2));
    
    c19 = getTailPart([-23,0,-1], 14, 6,8 , 65);
	c20 = getTailPart(c19[2], 12, 8, 7.5, 60);
	c21 = getTailPart(c20[2], 10, 7.5, 7 , 70);
	c22 = getTailPart(c21[2], 12, 7 , 5, 80);
	c23 = getTailPart(c22[2], 10, 5, 4, 65);
	c24 = getTailPart(c23[2], 6, 4, 3.7, 70);
	c25 = getTailPart(c24[2], 6, 3.7, 3.3, 80);
	c26 = getTailPart(c25[2], 6, 3.3, 2.4, 100);
	c27 = getTailPart(c26[2], 4, 2.4, 2, 90);
	c28 = getTailPart(c27[2], 6, 2, 1.5, 80);
	c29 = getTailPart(c28[2], 4, 1.5, 1, 60);
	c30 = getTailPart(c29[2], 4, 1, 0.7, 50);
	c31 = getTailPart(c30[2], 4, 0.7, 0.3, 30);
	
	part_side_5 = union(    
        c19[0],
        c19[1],
        c20[0],
        c20[1],
        c21[0],
        c21[1],
        c22[0],
        c22[1],
        c23[0],
        c23[1],
        c24[0],
        c24[1],
        c25[0],
        c25[1],
        c26[0],
        c26[1],
        c27[0],
        c27[1],
        c28[0],
        c28[1],
        c29[0],
        c29[1],
        c30[0],
        c30[1],
        c31[0]
	    );
    
    part_side_6 = rotate([0,0,3] , translate([0,8,0], part_side_5));
    tail3 = intersection(part_side_5, part_side_6);
    tail3 = translate([0,-5,0], rotate([0,0,-2], tail3));
    
    upper_tail = union(tail1, tail2, tail3);
    lower_tail = translate([-5,0,0], rotate([180,0,0], upper_tail));
    
    body = scale([0.8,0.3,0.3], translate([0,20,0], rotate([0,0,180], union(m1, m2, m3, m4))));
    
    tail = union(body, upper_tail, lower_tail);
    
    together = scale([0.5,0.5,0.5], union(tail, upper_tail, lower_tail));
    
	result = union( sphere({r:4.5, center: true }), together);
	    
	    
	function getTailPart( startpos, height, r1, r2, angle ){
	    c1 = CSG.cylinderElliptic ({start:  startpos , end: [startpos[0], startpos[1] , startpos[2] +height], radiusStart: r1, radiusEnd: r2, resolution: 20, center: startpos});

	    c1 = c1.rotate(startpos,[0,1,0],-angle);
	    end_pos = [startpos[0] - height * cos(90-angle), startpos[1] , startpos[2] + height * sin(90-angle)] ;
	    s1 = translate(end_pos , sphere({r: r2, fn: 32 }));
        return [c1,s1, end_pos];
    }
    
    
	return result;
}
