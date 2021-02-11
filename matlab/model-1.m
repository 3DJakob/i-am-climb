clc
m2 = 3.0;
g = 9.82;
m1 = 50; %vikt 
b = 5; %damper
k = 10; %fjäder

% State space
A = [-b/m1 1/m1; -k 0];
B = [b/m1 -1/m1; k 0];
C = [1 0];
D = [0 0];

% State space --> transfer function
[n, d] = ss2tf(A,B,C,D,2)

sys = tf(n,d)

%% eq
%    y''(t) + 0.5y'(t) + y(t) = -0.1u'(t)

% => y''(t) = -0.1u'(t) - 0.5y'(t) - y(t)
% => 


% Initial conditions and setup
h = 0.1;  % step size
x = 0:h:100;  % the range of x
y = zeros(size(x));  % allocate the result y
y(1) = 0;  % the initial y value
y_prim = zeros(size(x));
y_prim(1) = 0;
u_prim = 9.82*m1;

n = numel(y);  % the number of y values

Fm1 = zeros(size(x));
v1 = zeros(size(x));
Y = zeros(size(x));

y_bis = zeros(size(x));


% The loop to solve the DE

for i=1:n-1
    % repeat this for every wheel
    y_bis(i) = (1/m1) * (-0.1*u_prim - b*y_prim(i) - y(i));
    y_prim(i+1) = y_prim(i)+h*(y_bis(i));
    y(i+1) = y(i) + h * y_prim(i);

    %Fm1(i+1) = y(i+1) - u_prim;
    
    %Y(i+1) = Y(i) + y(i)*h + (y_prim(i)*(h^2))/2;
end

figure();

p1 = plot(y_bis,'b');   % Acceleration
hold on
p2 = plot(y_prim, 'g'); % Velocity
p3 = plot(y, 'r');      % Position
hold off
p = [p1;p2;p3];

legend(p,'acc','vel','pos');

